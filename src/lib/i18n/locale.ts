import { cookies } from "next/headers";

export type Locale = "en" | "af";

export const LOCALE_COOKIE = "coentax_lang";

/** Site defaults to Afrikaans; cookie `en` selects English. */
export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get(LOCALE_COOKIE)?.value;
  return v === "en" ? "en" : "af";
}
