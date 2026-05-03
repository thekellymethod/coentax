"use client";

import { switchToAfrikaans, switchToEnglish } from "@/app/actions/set-locale";
import type { Locale } from "@/lib/i18n/locale";

type Props = {
  locale: Locale;
  switchToEnglishLabel: string;
  switchToAfrikaansLabel: string;
};

export function LanguageMobileRow({
  locale,
  switchToEnglishLabel,
  switchToAfrikaansLabel,
}: Props) {
  return (
    <div className="border-b border-neutral-100 px-3 py-2">
      {locale === "af" ? (
        <form action={switchToEnglish}>
          <button
            type="submit"
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 text-center text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
          >
            {switchToEnglishLabel}
          </button>
        </form>
      ) : (
        <form action={switchToAfrikaans}>
          <button
            type="submit"
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 text-center text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
          >
            {switchToAfrikaansLabel}
          </button>
        </form>
      )}
    </div>
  );
}
