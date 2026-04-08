import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions for ${siteConfig.name}.`,
};

const faqs = [
  {
    q: "How long does the intake process take?",
    a: "Most clients complete the form and uploads in 5 to 15 minutes, depending on document readiness.",
  },
  {
    q: "What documents should I upload?",
    a: "Typically IRP5s, medical aid certificates, retirement annuity certificates, and relevant expense records.",
  },
  {
    q: "Is my information secure?",
    a: "Yes. Submissions are sent over HTTPS and stored in secure cloud or controlled local storage for this preview setup.",
  },
  {
    q: "When will I hear back?",
    a: "We generally respond within one business day after reviewing your submission.",
  },
  {
    q: "Can I submit if I am not sure about some details?",
    a: "Yes. Add notes where possible and we will clarify missing details during follow-up.",
  },
] as const;

export default function FaqPage() {
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
        <span className="text-neutral-800">FAQ</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Frequently asked questions
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600">
        Common questions about the intake process and how {siteConfig.name}{" "}
        supports your tax return.
      </p>

      <div className="mt-8 space-y-4">
        {faqs.map((item) => (
          <section
            key={item.q}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {item.a}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/start-tax-return"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-110"
        >
          Start tax return
        </Link>
        <Link
          href="/#contact"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-100"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
