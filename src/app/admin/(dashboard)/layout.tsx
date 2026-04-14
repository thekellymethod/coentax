import Link from "next/link";
import { CoenTaxLogo } from "@/components/coentax-logo";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="border-b border-white/10 bg-[#1a1a1a] text-white">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 rounded-md bg-white/95 px-2 py-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
            >
              <CoenTaxLogo variant="admin" />
            </Link>
            <span className="text-sm text-neutral-400">Admin Portal</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-sm text-neutral-300 sm:inline">
              Admin Portal
            </span>
            <Link
              href="/api/admin/logout"
              className="rounded-lg bg-[#991b1b] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </>
  );
}
