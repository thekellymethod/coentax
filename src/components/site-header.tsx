import Link from "next/link";
import { CoenTaxLogo } from "@/components/coentax-logo";
import { CurrentYear } from "@/components/current-year";
import { MobileNav } from "@/components/mobile-nav";
import { siteConfig } from "@/lib/site-config";

export const mainNavLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/start-tax-return", label: "Start return" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="coentax-safe-top mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:min-h-16 sm:gap-4 sm:px-6 sm:py-0">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 text-neutral-900"
          aria-label={`${siteConfig.name} home`}
        >
          <CoenTaxLogo variant="header" priority />
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm font-medium text-neutral-600 md:flex"
          aria-label="Main"
        >
          {mainNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-1 py-2 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/start-tax-return"
            className="inline-flex min-h-11 items-center rounded-lg bg-[var(--coentax-accent)] px-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 [touch-action:manipulation] sm:px-4"
          >
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">
              Start <CurrentYear /> return
            </span>
          </Link>
          <MobileNav links={[...mainNavLinks]} />
        </div>
      </div>
    </header>
  );
}
