const SESSION_SALT = "coentax-admin-session-v1";

/** Deterministic session token (Edge-safe) — compared to httpOnly cookie value. */
export async function getAdminSessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + SESSION_SALT);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
