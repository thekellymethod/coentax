import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & legal",
  description: `Legal information for ${siteConfig.name}.`,
};

export default function LegalPage() {
  return (
    <div className="coentax-safe-bottom mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-base text-[var(--coentax-accent)] hover:underline [touch-action:manipulation] sm:text-sm"
      >
        ← Home
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-neutral-900">
        Terms &amp; legal
      </h1>
      <p className="mt-4 text-neutral-600">
        This preview summary highlights core legal points for demonstration.
        Have a qualified professional draft your final terms of service,
        disclaimers, and SARS-related disclosures before launch.
      </p>
      <div className="mt-8 space-y-4 leading-relaxed text-neutral-700">
        <p>
          Use of this website does not create a client relationship until{" "}
          {siteConfig.name} confirms engagement in writing. Information on this
          site is general in nature and not tax or legal advice for your
          specific situation.
        </p>
        <p>
          Time-sensitive filings remain your responsibility unless agreed
          otherwise in writing. You should verify deadlines and SARS notices
          promptly.
        </p>
        <p>
          For details on data handling, please review our{" "}
          <Link
            href="/privacy"
            className="text-[var(--coentax-accent)] underline-offset-2 hover:underline"
          >
            privacy notice
          </Link>
          .
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/start-tax-return"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-5 py-3 text-base font-semibold text-white transition hover:brightness-110 sm:text-sm"
        >
          Start tax return
        </Link>
        <Link
          href="/faq"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-100 sm:text-sm"
        >
          Read FAQ
        </Link>
      </div>
    </div>
  );
}
