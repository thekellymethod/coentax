import type { Metadata } from "next";
import Link from "next/link";
import { CurrentYear } from "@/components/current-year";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} and how we help with South African tax returns.`,
};

export default function AboutPage() {
  return (
    <div className="coentax-safe-bottom mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <nav className="text-sm text-neutral-500">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md hover:text-[var(--coentax-accent)] [touch-action:manipulation] sm:min-h-0"
        >
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-800">About</span>
      </nav>

      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        About {siteConfig.name}
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600">
        We provide practical support for South African individual tax returns
        and compliance. Our goal is to keep the process simple: collect the
        right information, review your documents, and guide you clearly through
        next steps.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">What we do</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
            <li>Annual individual income tax return support</li>
            <li>Tax document review and submission guidance</li>
            <li>General compliance assistance and follow-up support</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">How we work</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-neutral-700">
            <li>You complete a short intake and upload documents securely</li>
            <li>We review and identify anything outstanding</li>
            <li>We contact you with a clear action plan</li>
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900">Preview notice</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          This preview site is intended for demo purposes. Final legal text,
          pricing, service scope, and policies should be reviewed and approved
          before production launch.
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/start-tax-return"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-110"
        >
          Start Your <CurrentYear /> Return
        </Link>
        <Link
          href="/faq"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-100"
        >
          View FAQ
        </Link>
      </div>
    </div>
  );
}
