import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminSessionToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json(
      {
        error:
          "Admin password is not configured. Add ADMIN_PASSWORD to your environment, or remove it to allow open access in development.",
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await getAdminSessionToken(password);
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  cookieStore.set("coentax_admin", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
