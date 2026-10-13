import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/auth/admin";
import { checkLoginLogStorage, getRecentLogins } from "@/lib/auth/login-log";
import { getSessionFromRequest } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminEmail(session.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const storage = await checkLoginLogStorage();
  const logins = await getRecentLogins(40);

  return NextResponse.json({
    logins,
    storage,
  });
}
