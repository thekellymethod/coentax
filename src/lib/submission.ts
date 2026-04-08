import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export type StoredFile = {
  originalName: string;
  size: number;
  contentType: string;
  /** Present when stored in Vercel Blob */
  pathname?: string;
  url?: string;
  /** Relative to project root when stored locally */
  localRelativePath?: string;
};

export type SubmissionRecord = {
  submissionId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  idOrTaxRef: string;
  preferredContact: string;
  taxYear: string;
  assistanceType: string;
  notes: string;
  clientType: string;
  consentContact: boolean;
  confirmAccurate: boolean;
  acknowledgePrivacy: boolean;
  files: StoredFile[];
};

const MAX_FILE_BYTES = 12 * 1024 * 1024; // 12 MB per file
const ALLOWED_EXT = new Set([
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "doc",
  "docx",
]);

export function assertAllowedFile(file: File): string | null {
  if (file.size > MAX_FILE_BYTES) {
    return `File "${file.name}" exceeds the maximum size of 12 MB.`;
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.has(ext)) {
    return `File "${file.name}" has an unsupported type. Use PDF, JPG, PNG, DOC, or DOCX.`;
  }
  return null;
}

export async function persistSubmissionFiles(
  submissionId: string,
  files: File[],
): Promise<StoredFile[]> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const stored: StoredFile[] = [];

  if (token) {
    for (const file of files) {
      const safeName = file.name.replace(/[^\w.\- ()]+/g, "_");
      const blobPath = `submissions/${submissionId}/${Date.now()}-${safeName}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await put(blobPath, buffer, {
        access: "private",
        token,
        contentType: file.type || "application/octet-stream",
      });
      stored.push({
        originalName: file.name,
        size: file.size,
        contentType: file.type || "application/octet-stream",
        pathname: result.pathname,
        url: result.url,
      });
    }
    return stored;
  }

  if (files.length === 0) {
    return [];
  }

  const dir = path.join(process.cwd(), "uploads", submissionId);
  await mkdir(dir, { recursive: true });

  for (const file of files) {
    const safeName = file.name.replace(/[^\w.\- ()]+/g, "_");
    const unique = `${Date.now()}-${safeName}`;
    const fullPath = path.join(dir, unique);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(fullPath, buffer);
    stored.push({
      originalName: file.name,
      size: file.size,
      contentType: file.type || "application/octet-stream",
      localRelativePath: path.join("uploads", submissionId, unique),
    });
  }

  return stored;
}

export async function saveSubmissionMetadata(record: SubmissionRecord) {
  const json = JSON.stringify(record, null, 2);
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const { submissionId } = record;

  if (token) {
    await put(`submissions/${submissionId}/submission.json`, json, {
      access: "private",
      token,
      contentType: "application/json",
    });
    return;
  }

  const dir = path.join(process.cwd(), "uploads", submissionId);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "submission.json"), json, "utf8");
}

export async function notifyNewSubmission(payload: {
  submissionId: string;
  fullName: string;
  email: string;
  taxYear: string;
  fileCount: number;
}) {
  const url = process.env.SUBMISSION_NOTIFY_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "coentax.submission",
        ...payload,
        at: new Date().toISOString(),
      }),
    });
  } catch {
    // Non-blocking: submission already stored
  }
}
