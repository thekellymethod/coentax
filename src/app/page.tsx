import Link from "next/link";
import { CurrentYear } from "@/components/current-year";
import {
  LandingDimensionArt,
  TrustDimensionArt,
} from "@/components/landing-dimension-art";
import { siteConfig } from "@/lib/site-config";

const services = [
  {
    title: "Individual income tax returns",
    text: "Preparation and review of your ITR12 and supporting schedules.",
  },
  {
    title: "Tax compliance assistance",
    text: "Stay on track with SARS requirements and filing obligations.",
  },
  {
    title: "Tax submission support",
    text: "Guidance through eFiling and resolving submission issues.",
  },
  {
    title: "Document review & processing",
    text: "We review IRP5s, certificates, and expense proofs you upload.",
  },
];

const steps = [
  { title: "Complete the form", text: "Tell us how we can help and share your contact details." },
  { title: "Upload supporting documents", text: "IRP5s, medical aid, RA certificates, and other docs — securely." },
  { title: "We review and process", text: "Our team assesses your information and prepares next actions." },
  { title: "You receive next steps", text: "We contact you with a clear plan and any follow-up required." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--coentax-hero)] text-white">
        <LandingDimensionArt />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Professional help with your South African tax return
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/start-tax-return"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
            >
              Start Your <CurrentYear /> Tax Return
            </Link>
            <div className="flex flex-col gap-2 sm:ml-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/#services"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/35 px-5 py-3 text-base font-medium text-white transition active:bg-white/15 sm:w-auto sm:text-sm"
              >
                Get Tax Help
              </Link>
              <Link
                href="/start-tax-return#documents"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/35 px-5 py-3 text-base font-medium text-white transition active:bg-white/15 sm:w-auto sm:text-sm"
              >
                Upload Your Documents
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/35 px-5 py-3 text-base font-medium text-white transition active:bg-white/15 sm:w-auto sm:text-sm"
              >
                Request Assistance
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          What we help with
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
          Focused support for individuals — without overwhelming detail.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-900"
            >
              <h3 className="font-semibold text-neutral-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {s.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="how-it-works"
        className="border-y border-neutral-200 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
            A straightforward process so you know exactly what happens next.
          </p>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--coentax-accent)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 flex justify-center lg:order-1">
            <TrustDimensionArt />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Why clients trust {siteConfig.name}
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              We focus on South African income tax — from annual returns to
              ongoing compliance. Your documents are handled securely, and we
              only use your information to deliver the tax assistance you
              requested.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-800">
              <li className="flex gap-2">
                <span className="text-[var(--coentax-accent)]" aria-hidden>
                  ✓
                </span>
                Secure upload and storage of tax documents
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--coentax-accent)]" aria-hidden>
                  ✓
                </span>
                South African tax assistance — not generic offshore advice
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--coentax-accent)]" aria-hidden>
                  ✓
                </span>
                Clear communication on timelines and next steps
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--coentax-hero)] py-16 text-center text-white sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(90deg, white 1px, transparent 1px),
              linear-gradient(white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-balance text-2xl font-bold sm:text-3xl">
            Ready to get your <CurrentYear /> return moving?
          </h2>
          <p className="mt-4 text-white/75">
            Start the intake — it only takes a few minutes. We will reach out
            after we review your submission.
          </p>
          <Link
            href="/start-tax-return"
            className="mt-8 inline-flex min-h-12 w-full max-w-md items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
          >
            Start Your <CurrentYear /> Tax Return
          </Link>
        </div>
      </section>
    </>
  );
}
