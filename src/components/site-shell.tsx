import { LanguageTopBar } from "@/components/language-top-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n/locale";
import { getMarketingCopy } from "@/lib/i18n/marketing";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const marketing = getMarketingCopy(locale);

  return (
    <>
      <LanguageTopBar locale={locale} topBar={marketing.topBar} />
      <SiteHeader locale={locale} marketing={marketing} />
      <main className="min-h-0 min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter marketing={marketing} />
    </>
  );
}
