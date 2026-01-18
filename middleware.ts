import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  const { pathname } = request.nextUrl

  // Protected Admin Routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/manager")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    try {
      // Basic decoding to check role (in real app, verify signature)
      const decoded = JSON.parse(Buffer.from(session, "base64").toString())
      
      if (pathname.startsWith("/admin") && decoded.role !== "admin") {
         return NextResponse.redirect(new URL("/auth/login", request.url))
      }
      
      if (pathname.startsWith("/manager") && decoded.role !== "manager") {
         return NextResponse.redirect(new URL("/auth/login", request.url))
      }

    } catch (e) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Auth Routes - redirect if already logged in
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
    if (session) {
      try {
        const decoded = JSON.parse(Buffer.from(session, "base64").toString())
        if (decoded.role === "admin") return NextResponse.redirect(new URL("/admin/overview", request.url))
        if (decoded.role === "manager") return NextResponse.redirect(new URL("/manager/dashboard", request.url))
        if (decoded.role === "customer") return NextResponse.redirect(new URL("/customer/menu", request.url))
      } catch (e) {
        // invalid session, continue to login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/auth/:path*"],
}
