import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${siteConfig.name} handles your personal information.`,
};

export default function PrivacyPage() {
  return (
    <div className="coentax-safe-bottom mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-base text-[var(--coentax-accent)] hover:underline [touch-action:manipulation] sm:text-sm"
      >
        ← Home
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-neutral-900">Privacy notice</h1>
      <p className="mt-4 text-neutral-600">
        This preview summary explains how information is handled on this demo
        site. Replace with your approved POPIA-compliant policy before launch.
      </p>
      <div className="mt-8 space-y-4 leading-relaxed text-neutral-700">
        <p>
          {siteConfig.name} ({siteConfig.domain}) collects the information you
          submit through our intake form solely to provide tax-related services
          you request. Documents you upload are stored securely and accessed
          only by authorised staff.
        </p>
        <p>
          We do not sell your personal information. For questions, contact{" "}
          <a
            className="text-[var(--coentax-accent)] underline-offset-2 hover:underline"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <p>
          By submitting the intake form, you consent to us processing submitted
          details and uploaded files for the purpose of providing tax-related
          services and support.
        </p>
        <p>
          You can request correction or deletion of your information where
          legally permitted by contacting us directly.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/legal"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-100 sm:text-sm"
        >
          Terms &amp; legal
        </Link>
        <Link
          href="/start-tax-return"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-5 py-3 text-base font-semibold text-white transition hover:brightness-110 sm:text-sm"
        >
          Start tax return
        </Link>
      </div>
    </div>
  );
}
