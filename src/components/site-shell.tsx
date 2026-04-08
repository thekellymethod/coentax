import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-0 min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
    </>
  );
}
