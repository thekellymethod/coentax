"use client";

/** Renders the current calendar year (client clock). Use in CTAs so labels stay current. */
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
