import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";

const SESSION_COOKIE = "sg_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function getCredentials() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "supawat2026";
  return { username, password };
}

function getSecret() {
  return process.env.AUTH_SECRET ?? "supawat-group-default-secret-change-me";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function verifyCredentials(username: string, password: string): boolean {
  const c = getCredentials();
  return username === c.username && password === c.password;
}

export function makeToken(username: string): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${username}.${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export type Session = { username: string; expires: number };

export function parseToken(token: string): Session | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [username, expiresStr, signature] = parts;
  const expectedSignature = sign(`${username}.${expiresStr}`);
  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex"),
    )
  ) {
    return null;
  }
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;
  return { username, expires };
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return parseToken(token);
}

export async function setSession(username: string): Promise<void> {
  const token = makeToken(username);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export { SESSION_COOKIE };
