import type { Metadata } from "next";
import Link from "next/link";
import { IntakeForm } from "./intake-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Start your tax return",
  description: `Submit your details and documents to ${siteConfig.name} for South African tax assistance.`,
};

export default function StartTaxReturnPage() {
  return (
    <div className="coentax-safe-bottom mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <nav className="text-sm text-neutral-500">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md hover:text-[var(--coentax-accent)] [touch-action:manipulation] sm:min-h-0"
        >
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-800">Start tax return</span>
      </nav>
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-neutral-900">
        Tax return intake
      </h1>
      <p className="mt-3 text-neutral-600">
        Complete the sections below. Fields marked with{" "}
        <span className="text-red-600">*</span> are required. If you are unsure
        about anything, add a short note — we will clarify when we contact you.
      </p>
      <div className="mt-10">
        <IntakeForm />
      </div>
    </div>
  );
}
