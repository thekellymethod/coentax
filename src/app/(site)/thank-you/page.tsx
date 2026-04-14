import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your submission was received.",
};

type Props = { searchParams: Promise<{ ref?: string }> };

export default async function ThankYouPage({ searchParams }: Props) {
  const { ref } = await searchParams;

  return (
    <div className="coentax-safe-bottom mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 sm:py-24">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--coentax-accent)] bg-white text-2xl text-[var(--coentax-accent)]">
        ✓
      </div>
      <h1 className="mt-8 text-balance text-3xl font-bold text-neutral-900">
        Thank you — we have your submission
      </h1>
      <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
        Your information and documents have been submitted successfully.{" "}
        {siteConfig.name} will review your submission and contact you shortly
        regarding next steps.
      </p>
      {ref ? (
        <p className="mt-4 text-sm text-neutral-500">
          Reference:{" "}
          <code className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-neutral-900">
            {ref}
          </code>
        </p>
      ) : null}
      <div className="mt-10 space-y-4 text-left rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        <p className="font-semibold text-neutral-900">What happens next</p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            We aim to respond within{" "}
            <strong className="font-medium text-neutral-900">
              one business day
            </strong>{" "}
            (often sooner).
          </li>
          <li>
            If you uploaded files, they are attached to your submission record.
            You do not need to send them again unless we ask.
          </li>
          <li>
            Watch your inbox or phone (whichever you selected) for our
            message.
          </li>
        </ul>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center justify-center text-base font-medium text-[var(--coentax-accent)] underline-offset-4 hover:underline [touch-action:manipulation] sm:text-sm"
      >
        Back to home
      </Link>
    </div>
  );
}
