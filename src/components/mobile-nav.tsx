"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type MobileNavLink = { href: string; label: string };

type Props = {
  links: MobileNavLink[];
  menuTitle: string;
  closeMenuLabel: string;
  openMenuLabel: string;
  languageRow?: ReactNode;
  startCta: ReactNode;
};

export function MobileNav({
  links,
  menuTitle,
  closeMenuLabel,
  openMenuLabel,
  languageRow,
  startCta,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-sm transition hover:bg-neutral-50"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeMenuLabel : openMenuLabel}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={menuTitle}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label={closeMenuLabel}
            onClick={close}
          />
          <nav
            id={panelId}
            className="coentax-safe-top coentax-safe-bottom absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-neutral-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <span className="text-sm font-semibold text-neutral-900">
                {menuTitle}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                className="min-h-11 min-w-11 rounded-lg text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                aria-label={closeMenuLabel}
                onClick={close}
              >
                <svg
                  className="mx-auto h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {languageRow}
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-neutral-800 transition hover:bg-neutral-100"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-100 p-3">
              <Link
                href="/start-tax-return"
                className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[var(--coentax-accent)] text-base font-semibold text-white transition hover:brightness-110"
                onClick={close}
              >
                {startCta}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
