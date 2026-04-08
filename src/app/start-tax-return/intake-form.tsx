"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function IntakeForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileHint, setFileHint] = useState<string | null>(null);
  const displayYear = new Date().getFullYear();
  const taxYearOptions = [displayYear, displayYear - 1, displayYear - 2];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = formRef.current;
    if (!form) return;

    setPending(true);
    try {
      const fd = new FormData(form);
      const res = await fetch("/api/submit", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as {
        ok?: boolean;
        submissionId?: string;
        errors?: string[];
        error?: string;
      };

      if (!res.ok) {
        if (data.errors?.length) {
          setError(data.errors.join(" "));
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      if (data.submissionId) {
        router.push(`/thank-you?ref=${encodeURIComponent(data.submissionId)}`);
      } else {
        router.push("/thank-you");
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="space-y-12"
      noValidate
    >
      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-neutral-900">
          Section A — Personal details
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          We use this information to reach you about your tax return.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-neutral-700">
              Full name <span className="text-red-600">*</span>
            </span>
            <input
              name="fullName"
              required
              autoComplete="name"
              className="box-border mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3 py-3 text-base text-neutral-900 shadow-sm outline-none ring-[var(--coentax-accent)] focus:border-[var(--coentax-accent)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">
              Email address <span className="text-red-600">*</span>
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="box-border mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3 py-3 text-base text-neutral-900 shadow-sm outline-none ring-[var(--coentax-accent)] focus:border-[var(--coentax-accent)] focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">
              Phone number <span className="text-red-600">*</span>
            </span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="box-border mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3 py-3 text-base text-neutral-900 shadow-sm outline-none ring-[var(--coentax-accent)] focus:border-[var(--coentax-accent)] focus:ring-2"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-neutral-700">
              ID number or tax reference (if applicable)
            </span>
            <input
              name="idOrTaxRef"
              autoComplete="off"
              className="box-border mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3 py-3 text-base text-neutral-900 shadow-sm outline-none ring-[var(--coentax-accent)] focus:border-[var(--coentax-accent)] focus:ring-2"
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium text-neutral-700">
              Preferred contact method <span className="text-red-600">*</span>
            </legend>
            <div className="mt-2 flex flex-col gap-2 text-base text-neutral-800 sm:flex-row sm:flex-wrap sm:gap-4 sm:text-sm">
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  required
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                Email
              </label>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                Phone
              </label>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="preferredContact"
                  value="whatsapp"
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                WhatsApp
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-neutral-900">
          Section B — Tax service details
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">
              Tax year <span className="text-red-600">*</span>
            </span>
            <select
              name="taxYear"
              required
              defaultValue={String(displayYear)}
              className="box-border mt-1.5 min-h-11 w-full rounded-lg border border-neutral-300 px-3 py-3 text-base text-neutral-900 shadow-sm outline-none ring-[var(--coentax-accent)] focus:border-[var(--coentax-accent)] focus:ring-2"
            >
              {taxYearOptions.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
              <option value="other">Other / not sure</option>
            </select>
          </label>
          <fieldset>
            <legend className="text-sm font-medium text-neutral-700">
              Type of assistance <span className="text-red-600">*</span>
            </legend>
            <div className="mt-2 space-y-1 text-base text-neutral-800 sm:text-sm">
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="assistanceType"
                  value="tax_return"
                  required
                  defaultChecked
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                Tax return
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="assistanceType"
                  value="compliance"
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                Compliance
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="assistanceType"
                  value="other"
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                Other
              </label>
            </div>
          </fieldset>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-neutral-700">
              Brief description / notes
            </span>
            <textarea
              name="notes"
              rows={4}
              placeholder="e.g. Multiple IRP5s, provisional tax, foreign income…"
              className="box-border mt-1.5 min-h-[10rem] w-full rounded-lg border border-neutral-300 px-3 py-3 text-base text-neutral-900 shadow-sm outline-none ring-[var(--coentax-accent)] focus:border-[var(--coentax-accent)] focus:ring-2"
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium text-neutral-700">
              Client status <span className="text-red-600">*</span>
            </legend>
            <div className="mt-2 flex flex-col gap-2 text-base text-neutral-800 sm:flex-row sm:flex-wrap sm:gap-4 sm:text-sm">
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="clientType"
                  value="new"
                  required
                  defaultChecked
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                New client
              </label>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-lg py-1 sm:min-h-0">
                <input
                  type="radio"
                  name="clientType"
                  value="returning"
                  className="h-5 w-5 shrink-0 text-[var(--coentax-accent)]"
                />
                Returning client
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <section
        id="documents"
        className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <h2 className="text-lg font-semibold text-neutral-900">
          Section C — Document upload
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Upload IRP5s, medical aid certificates, retirement annuity
          certificates, proof of expenses, or other tax documents. You can add
          multiple files (PDF, JPG, PNG, DOC, DOCX — up to 12 MB each).
        </p>
        <div className="mt-6">
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">
              Supporting documents
            </span>
            <input
              name="documents"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(ev) => {
                const list = ev.target.files;
                if (!list?.length) {
                  setFileHint(null);
                  return;
                }
                const names = Array.from(list)
                  .map((f) => f.name)
                  .join(", ");
                setFileHint(`${list.length} file(s) selected: ${names}`);
              }}
              className="mt-2 block w-full text-base text-neutral-600 file:mr-4 file:min-h-11 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-4 file:py-3 file:text-base file:font-medium file:text-neutral-800 hover:file:bg-neutral-200"
            />
          </label>
          {fileHint && (
            <p className="mt-2 text-xs text-neutral-500">{fileHint}</p>
          )}
          <p className="mt-3 text-xs text-neutral-500">
            Transmitted over HTTPS and stored using secure cloud storage in
            production.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-neutral-900">
          Section D — Consent &amp; declaration
        </h2>
        <div className="mt-6 space-y-4 text-base text-neutral-800 sm:text-sm">
          <label className="flex cursor-pointer gap-3 rounded-lg py-1">
            <input
              type="checkbox"
              name="consentContact"
              required
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-[var(--coentax-accent)]"
            />
            <span>
              I consent to {siteConfig.name} contacting me about my tax
              enquiry. <span className="text-red-600">*</span>
            </span>
          </label>
          <label className="flex cursor-pointer gap-3 rounded-lg py-1">
            <input
              type="checkbox"
              name="confirmAccurate"
              required
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-[var(--coentax-accent)]"
            />
            <span>
              I confirm the information provided is accurate to the best of my
              knowledge. <span className="text-red-600">*</span>
            </span>
          </label>
          <label className="flex cursor-pointer gap-3 rounded-lg py-1">
            <input
              type="checkbox"
              name="acknowledgePrivacy"
              required
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-[var(--coentax-accent)]"
            />
            <span>
              I acknowledge how my information and documents will be handled,
              as described in the{" "}
              <a
                href="/privacy"
                className="text-[var(--coentax-accent)] underline decoration-2 underline-offset-2 [touch-action:manipulation]"
              >
                privacy notice
              </a>
              . <span className="text-red-600">*</span>
            </span>
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Submitting…" : "Submit intake & documents"}
        </button>
        <p className="text-sm text-neutral-600">
          You will see a confirmation page with reference details.
        </p>
      </div>
    </form>
  );
}
