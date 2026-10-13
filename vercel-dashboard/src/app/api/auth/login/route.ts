import { NextResponse } from "next/server";
import { isAllowedEmail, normalizeEmail } from "@/lib/auth/domain";
import { recordLogin } from "@/lib/auth/login-log";
import {
  SESSION_COOKIE,
  createSessionToken,
  isAuthConfigured,
  sessionCookieOptions,
  shouldSkipAuth,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  if (shouldSkipAuth()) {
    const response = NextResponse.json({ ok: true, dev: true });
    response.cookies.set(
      SESSION_COOKIE,
      await createSessionToken("dev@ab-inbev.com"),
      sessionCookieOptions(),
    );
    return response;
  }

  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Authentication is not configured on this deployment." },
      { status: 503 },
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  if (!email) {
    return NextResponse.json({ error: "Enter your email address." }, { status: 400 });
  }

  if (!isAllowedEmail(email)) {
    return NextResponse.json(
      { error: "Access is restricted to @ab-inbev.com email addresses." },
      { status: 403 },
    );
  }

  const sessionToken = await createSessionToken(email);
  try {
    await recordLogin({
      email,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
  } catch {
    // Login should succeed even if audit log storage fails.
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, sessionToken, sessionCookieOptions());
  return response;
}
