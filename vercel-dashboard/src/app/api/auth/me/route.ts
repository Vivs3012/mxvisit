import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSessionFromRequest } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    email: session.email,
    isAdmin: isAdminEmail(session.email),
  });
}
