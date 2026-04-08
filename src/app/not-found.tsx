import Link from "next/link";

export default function NotFound() {
  return (
    <div className="coentax-safe-bottom mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--coentax-accent)]">
        404
      </p>
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-neutral-600">
        The page you tried to open may have moved or no longer exists. Use one
        of the links below to continue your preview demo.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-100"
        >
          Go to home
        </Link>
        <Link
          href="/start-tax-return"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--coentax-accent)] px-6 py-3 text-base font-semibold text-white transition hover:brightness-110"
        >
          Start tax return
        </Link>
      </div>
    </div>
  );
}
