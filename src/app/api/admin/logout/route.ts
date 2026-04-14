import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("coentax_admin");

  const url = new URL("/", request.url);
  return NextResponse.redirect(url);
}
