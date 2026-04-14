import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";
import { CoenTaxLogo } from "@/components/coentax-logo";
import { getAdminSessionToken } from "@/lib/admin-session";

export default async function AdminLoginPage() {
  const envPassword = process.env.ADMIN_PASSWORD;
  if (envPassword) {
    const cookieStore = await cookies();
    const token = cookieStore.get("coentax_admin")?.value;
    const expected = await getAdminSessionToken(envPassword);
    if (token && token === expected) {
      redirect("/admin");
    }
  }

  const passwordConfigured = Boolean(envPassword);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
          <CoenTaxLogo variant="admin" />
        </div>
        <p className="text-sm text-neutral-600">CoenTax Admin Portal</p>
      </div>
      <Suspense fallback={<div className="h-48 w-full max-w-sm animate-pulse rounded-xl bg-neutral-300/50" />}>
        <AdminLoginForm passwordConfigured={passwordConfigured} />
      </Suspense>
      {!passwordConfigured ? (
        <p className="mt-6 max-w-sm text-center text-xs text-neutral-500">
          No password is set, so the dashboard is open to anyone who visits{" "}
          <code className="rounded bg-neutral-100 px-1">/admin</code>. To require
          sign-in, add{" "}
          <code className="rounded bg-neutral-100 px-1">ADMIN_PASSWORD</code> to{" "}
          <code className="rounded bg-neutral-100 px-1">.env.local</code> and restart
          the server.
        </p>
      ) : null}
    </div>
  );
}
