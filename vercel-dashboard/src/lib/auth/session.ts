import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./constants";
import { isAllowedEmail, normalizeEmail } from "./domain";

function getSecret(): Uint8Array {
 const secret = process.env.AUTH_SECRET;
 if (!secret) {
 throw new Error("AUTH_SECRET is not configured");
 }
 return new TextEncoder().encode(secret);
}

export function isAuthConfigured(): boolean {
 return Boolean(process.env.AUTH_SECRET);
}

export function shouldSkipAuth(): boolean {
 return process.env.NODE_ENV === "development" && process.env.AUTH_SKIP === "true";
}

export type SessionPayload = {
 email: string;
};

export async function createSessionToken(email: string): Promise<string> {
 const normalized = normalizeEmail(email);
 if (!isAllowedEmail(normalized)) {
 throw new Error("Email domain not allowed");
 }

 return new SignJWT({ email: normalized } satisfies SessionPayload)
.setProtectedHeader({ alg: "HS256" })
.setIssuedAt()
.setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
.sign(getSecret());
}

export async function verifySessionToken(
 token: string | undefined,
): Promise<SessionPayload | null> {
 if (!token || !isAuthConfigured()) return null;

 try {
 const { payload } = await jwtVerify(token, getSecret());
 const email = typeof payload.email === "string" ? normalizeEmail(payload.email) : "";
 if (!email || !isAllowedEmail(email)) return null;
 return { email };
 } catch {
 return null;
 }
}

export async function getSessionFromRequest(
 request: NextRequest,
): Promise<SessionPayload | null> {
 if (shouldSkipAuth()) {
 return { email: "dev@ab-inbev.com" };
 }

 const token = request.cookies.get(SESSION_COOKIE)?.value;
 return verifySessionToken(token);
}

export function sessionCookieOptions(maxAge = SESSION_MAX_AGE_SECONDS) {
 return {
 httpOnly: true,
 secure: process.env.NODE_ENV === "production",
 sameSite: "lax" as const,
 path: "/",
 maxAge,
 };
}

export { SESSION_COOKIE };
