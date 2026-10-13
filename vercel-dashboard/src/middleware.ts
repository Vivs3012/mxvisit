import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequest, shouldSkipAuth } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
 if (shouldSkipAuth()) {
 return NextResponse.next();
 }

 const session = await getSessionFromRequest(request);
 if (session) {
 return NextResponse.next();
 }

 const loginUrl = new URL("/login", request.url);
 const callbackPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
 if (callbackPath && callbackPath !== "/") {
 loginUrl.searchParams.set("callbackUrl", callbackPath);
 }

 return NextResponse.redirect(loginUrl);
}

export const config = {
 matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
