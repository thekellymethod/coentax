import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type Variant = "header" | "footer" | "admin";

const variantClass: Record<Variant, string> = {
  header:
    "relative inline-block h-8 w-[10rem] shrink-0 sm:h-9 sm:w-[11.5rem]",
  footer: "relative inline-block h-[4.25rem] w-full max-w-[17rem]",
  admin:
    "relative inline-block h-9 w-[9.5rem] shrink-0 sm:h-10 sm:w-[11rem]",
};

/** Brand logo from `siteConfig.logoPath` (PNG in `/public`). */
export function CoenTaxLogo({
  variant = "header",
  className = "",
  priority,
}: {
  variant?: Variant;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`${variantClass[variant]} ${className}`.trim()}>
      <Image
        src={siteConfig.logoPath}
        alt={`${siteConfig.name} logo`}
        fill
        className="object-contain object-left"
        sizes={
          variant === "footer"
            ? "(max-width: 1024px) 100vw, 17rem"
            : "(max-width: 640px) 10rem, 12rem"
        }
        priority={priority}
      />
    </span>
  );
}
