import { switchToAfrikaans, switchToEnglish } from "@/app/actions/set-locale";
import type { Locale } from "@/lib/i18n/locale";
import type { MarketingCopy } from "@/lib/i18n/marketing";

type Props = {
  locale: Locale;
  topBar: MarketingCopy["topBar"];
};

export function LanguageTopBar({ locale, topBar }: Props) {
  return (
    <div className="border-b border-neutral-200 bg-[#f4f4f5]">
      <div className="coentax-safe-top mx-auto flex max-w-6xl flex-col items-stretch gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-center text-xs leading-snug text-neutral-700 sm:text-left sm:text-sm">
          {topBar.statusLine}
        </p>
        {locale === "af" ? (
          <form
            action={switchToEnglish}
            className="flex shrink-0 justify-center sm:justify-end"
          >
            <button
              type="submit"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 sm:text-sm"
            >
              {topBar.switchToEnglish}
            </button>
          </form>
        ) : (
          <form
            action={switchToAfrikaans}
            className="flex shrink-0 justify-center sm:justify-end"
          >
            <button
              type="submit"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 sm:text-sm"
            >
              {topBar.switchToAfrikaans}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
