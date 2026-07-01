import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedPrefixes = ["/dashboard", "/super-admin"];

function secretKey() {
  return new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "development-secret-change-me");
}

export async function middleware(req: NextRequest) {
  const isProtected = protectedPrefixes.some((prefix) => req.nextUrl.pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("pos_session")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (req.nextUrl.pathname.startsWith("/super-admin") && payload.role !== "super_admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/super-admin/:path*"]
};
