import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  assertAllowedFile,
  notifyNewSubmission,
  persistSubmissionFiles,
  saveSubmissionMetadata,
  type SubmissionRecord,
} from "@/lib/submission";

const REQUIRED = [
  "fullName",
  "email",
  "phone",
  "preferredContact",
  "taxYear",
  "assistanceType",
  "clientType",
] as const;

function truthyCheckbox(v: FormDataEntryValue | null) {
  return v === "on" || v === "true" || v === "1";
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 },
    );
  }

  const get = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  const errors: string[] = [];

  for (const key of REQUIRED) {
    if (!get(key)) {
      errors.push(`Missing required field: ${key}`);
    }
  }

  const consentContact = truthyCheckbox(formData.get("consentContact"));
  const confirmAccurate = truthyCheckbox(formData.get("confirmAccurate"));
  const acknowledgePrivacy = truthyCheckbox(formData.get("acknowledgePrivacy"));

  if (!consentContact) errors.push("Consent to be contacted is required.");
  if (!confirmAccurate) errors.push("Accuracy confirmation is required.");
  if (!acknowledgePrivacy) errors.push("Privacy acknowledgment is required.");

  const email = get("email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  const assistanceType = get("assistanceType");
  if (assistanceType && !["tax_return", "compliance", "other"].includes(assistanceType)) {
    errors.push("Invalid assistance type.");
  }

  const clientType = get("clientType");
  if (clientType && !["new", "returning"].includes(clientType)) {
    errors.push("Invalid client type.");
  }

  const preferredContact = get("preferredContact");
  if (
    preferredContact &&
    !["email", "phone", "whatsapp"].includes(preferredContact)
  ) {
    errors.push("Invalid preferred contact method.");
  }

  const rawFiles = formData.getAll("documents");
  const files: File[] = [];
  for (const entry of rawFiles) {
    if (entry instanceof File && entry.size > 0) {
      files.push(entry);
    }
  }

  for (const file of files) {
    const fileError = assertAllowedFile(file);
    if (fileError) errors.push(fileError);
  }

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const submissionId = randomUUID();
  const submittedAt = new Date().toISOString();

  try {
    const storedFiles = await persistSubmissionFiles(submissionId, files);

    const record: SubmissionRecord = {
      submissionId,
      submittedAt,
      fullName: get("fullName"),
      email,
      phone: get("phone"),
      idOrTaxRef: get("idOrTaxRef"),
      preferredContact,
      taxYear: get("taxYear"),
      assistanceType,
      notes: get("notes"),
      clientType,
      consentContact,
      confirmAccurate,
      acknowledgePrivacy,
      files: storedFiles,
    };

    await saveSubmissionMetadata(record);

    await notifyNewSubmission({
      submissionId,
      fullName: record.fullName,
      email: record.email,
      taxYear: record.taxYear,
      fileCount: storedFiles.length,
    });

    return NextResponse.json({ ok: true, submissionId });
  } catch (e) {
    console.error("submit error", e);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not complete your submission. Please try again or contact us directly.",
      },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
