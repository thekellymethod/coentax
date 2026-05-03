import Link from "next/link";
import { CoenTaxLogo } from "@/components/coentax-logo";
import { CurrentYear } from "@/components/current-year";
import { LanguageMobileRow } from "@/components/language-mobile-row";
import { MobileNav } from "@/components/mobile-nav";
import type { Locale } from "@/lib/i18n/locale";
import type { MarketingCopy } from "@/lib/i18n/marketing";
import { siteConfig } from "@/lib/site-config";

type Props = {
  locale: Locale;
  marketing: MarketingCopy;
};

export function SiteHeader({ locale, marketing }: Props) {
  const { nav, header } = marketing;

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
          className="hidden items-center gap-5 text-sm font-medium text-neutral-600 lg:flex"
          aria-label="Main"
        >
          {nav.map((item) => (
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
            <span className="sm:hidden">{header.startReturnShort}</span>
            <span className="hidden sm:inline">
              {header.startReturnLongBeforeYear} <CurrentYear />{" "}
              {header.startReturnLongAfterYear}
            </span>
          </Link>
          <MobileNav
            links={[...nav]}
            menuTitle={marketing.mobileMenuTitle}
            closeMenuLabel={marketing.mobileMenuClose}
            openMenuLabel={marketing.mobileOpenMenu}
            languageRow={
              <LanguageMobileRow
                locale={locale}
                switchToEnglishLabel={marketing.topBar.switchToEnglish}
                switchToAfrikaansLabel={marketing.topBar.switchToAfrikaans}
              />
            }
            startCta={
              <>
                {header.startReturnLongBeforeYear} <CurrentYear />{" "}
                {header.startReturnLongAfterYear}
              </>
            }
          />
        </div>
      </div>
    </header>
  );
}
