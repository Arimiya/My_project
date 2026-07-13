import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./auth";
import { hasPermission, type RoleName } from "./permissions";

export function assertSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return null;

  const requestOrigin = new URL(req.url).origin;
  if (origin !== requestOrigin) {
    return NextResponse.json({ message: "Request origin is not allowed" }, { status: 403 });
  }

  return null;
}

export async function requireApiSession(permission?: string) {
  const session = await getSession();
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };
  }

  if (permission && !hasPermission(session.role as RoleName, permission)) {
    return {
      session: null,
      response: NextResponse.json({ message: "Forbidden" }, { status: 403 })
    };
  }

  return { session, response: null };
}

export function safeErrorResponse(message = "Something went wrong. Please try again.", status = 500) {
  return NextResponse.json({ message }, { status });
}
