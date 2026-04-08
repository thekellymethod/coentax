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
        Placeholder content. Have a qualified professional draft your terms of
        service, disclaimers, and SARS-related disclosures.
      </p>
      <div className="mt-8 leading-relaxed text-neutral-700">
        <p>
          Use of this website does not create a client relationship until{" "}
          {siteConfig.name} confirms engagement in writing. Information on this
          site is general in nature and not tax or legal advice for your
          specific situation.
        </p>
      </div>
    </div>
  );
}
