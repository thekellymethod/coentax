"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n/locale";
import { LOCALE_COOKIE } from "@/lib/i18n/locale";

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

export async function setLocale(locale: Locale) {
  if (locale !== "en" && locale !== "af") {
    return;
  }
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, locale, COOKIE_OPTIONS);
  revalidatePath("/", "layout");
}

export async function switchToEnglish() {
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, "en", COOKIE_OPTIONS);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function switchToAfrikaans() {
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, "af", COOKIE_OPTIONS);
  revalidatePath("/", "layout");
  redirect("/");
}
