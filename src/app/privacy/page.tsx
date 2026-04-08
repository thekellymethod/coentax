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
        This page is a placeholder summary. Replace with advice from your legal
        or compliance advisor before going live.
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
      </div>
    </div>
  );
}
