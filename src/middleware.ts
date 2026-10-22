import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("gymcore_session")?.value;
  const { pathname } = request.nextUrl;

  // 1. Proteger el dashboard si no hay cookie
  if (pathname.startsWith("/dashboard") && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Si ya está logueado y va a login, mandarlo al dashboard
  if (pathname === "/login" && sessionToken) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};