import Link from "next/link";
import { CoenTaxLogo } from "@/components/coentax-logo";
import type { MarketingCopy } from "@/lib/i18n/marketing";
import { siteConfig } from "@/lib/site-config";

type Props = {
  marketing: MarketingCopy;
};

export function SiteFooter({ marketing }: Props) {
  const year = new Date().getFullYear();
  const f = marketing.footer;

  return (
    <footer
      id="contact"
      className="border-t border-red-600/40 bg-[var(--coentax-hero)] text-neutral-300"
    >
      <div className="coentax-safe-bottom mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <CoenTaxLogo variant="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {f.blurb}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{f.contact}</p>
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
            <p className="text-sm font-semibold text-white">{f.explore}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  {f.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  {f.faq}
                </Link>
              </li>
              <li>
                <Link
                  href="/start-tax-return"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  {f.startReturn}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  {f.adminPreview}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{f.legal}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  {f.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="block py-2 text-neutral-300 transition hover:text-red-500 [touch-action:manipulation] sm:py-0.5"
                >
                  {f.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-neutral-500">
          © {year} {siteConfig.name}. {f.rightsReserved} · {siteConfig.domain}
        </p>
      </div>
    </footer>
  );
}
