import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="border-t border-red-600/40 bg-[var(--coentax-hero)] text-neutral-300"
    >
      <div className="coentax-safe-bottom mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-400">
              South African income tax returns and compliance support. Secure
              handling of your documents and information.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                  href={`mailto:${siteConfig.contactEmail}`}
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>
                <a
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                  href={`tel:${siteConfig.phoneTel}`}
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                  href={`https://wa.me/${siteConfig.whatsAppTel}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.whatsAppDisplay}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/start-tax-return"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  Start tax return
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  Terms &amp; legal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-neutral-500">
          © {year} {siteConfig.name}. All rights reserved. ·{" "}
          {siteConfig.domain}
        </p>
      </div>
    </footer>
  );
}
