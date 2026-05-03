import Link from "next/link";
import { CurrentYear } from "@/components/current-year";
import {
  LandingDimensionArt,
  TrustDimensionArt,
} from "@/components/landing-dimension-art";
import { getLocale } from "@/lib/i18n/locale";
import { getMarketingCopy } from "@/lib/i18n/marketing";
import { siteConfig } from "@/lib/site-config";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getMarketingCopy(locale);
  const h = t.home;

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--coentax-hero)] text-white">
        <LandingDimensionArt />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-500">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {h.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {h.heroDescription}
          </p>
          <ul className="mt-8 flex max-w-3xl flex-wrap gap-2 sm:gap-3">
            {h.heroTrust.map((line) => (
              <li
                key={line}
                className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs text-white/90 sm:text-sm"
              >
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/start-tax-return"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
            >
              {h.heroPrimaryCtaBefore}{" "}
              <CurrentYear /> {h.heroPrimaryCtaAfter}
            </Link>
            <div className="flex flex-col gap-2 sm:ml-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/#services"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/35 px-5 py-3 text-base font-medium text-white transition active:bg-white/15 sm:w-auto sm:text-sm"
              >
                {h.heroSecondaryServices}
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/35 px-5 py-3 text-base font-medium text-white transition active:bg-white/15 sm:w-auto sm:text-sm"
              >
                {h.heroSecondaryContact}
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
          {h.servicesTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
          {h.servicesSubtitle}
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {h.services.map((s) => (
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
            {h.howTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
            {h.howSubtitle}
          </p>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {h.steps.map((step, i) => (
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
              {h.trustTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">{h.trustLead}</p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-800">
              {h.trustBullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--coentax-accent)]" aria-hidden>
                    ✓
                  </span>
                  {line}
                </li>
              ))}
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
            {h.ctaTitleBefore} <CurrentYear /> {h.ctaTitleAfter}
          </h2>
          <p className="mt-4 text-white/75">{h.ctaSubtitle}</p>
          <Link
            href="/start-tax-return"
            className="mt-8 inline-flex min-h-12 w-full max-w-md items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
          >
            {h.ctaButtonBefore} <CurrentYear /> {h.ctaButtonAfter}
          </Link>
        </div>
      </section>
    </>
  );
}
