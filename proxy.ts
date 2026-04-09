/**
 * Next.js Middleware for Route Protection
 * 
 * This middleware intercepts requests and protects routes that require authentication.
 * It runs on the server, providing better security than client-side checks.
 * 
 * To add/remove protected routes, edit lib/config/routes.ts
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { 
  isProtectedRoute, 
  isAuthRoute, 
  getLoginRedirectUrl,
  routeConfig 
} from "@/lib/config/routes";

/**
 * Cookie names for authentication tokens
 */
const AUTH_COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

/**
 * Check if user is authenticated via cookies
 */
function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.ACCESS_TOKEN)?.value;
  return !!accessToken;
}

/**
 * Get the pathname from the request
 */
function getPathname(request: NextRequest): string {
  return request.nextUrl.pathname;
}

/**
 * Middleware configuration
 * Run on specific paths for better performance
 */
export const config = {
  // Matcher: Run middleware on all routes except static files, api, and _next
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};

/**
 * Middleware function
 * Protects routes based on authentication status
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authenticated = isAuthenticated(request);

  // 1. Handle protected routes (require authentication)
  if (isProtectedRoute(pathname)) {
    if (!authenticated) {
      // Get full URL including query params for redirect
      const fullPath = request.nextUrl.href;
      const loginUrl = getLoginRedirectUrl(fullPath);
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
    // User is authenticated, allow access
    return NextResponse.next();
  }

  // 2. Handle auth routes (login/signup - redirect if already authenticated)
  if (isAuthRoute(pathname)) {
    if (authenticated) {
      // Redirect authenticated users to home or specific redirect param
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      const redirectUrl = redirectParam || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    // Not authenticated, allow access to auth pages
    return NextResponse.next();
  }

  // 3. Allow all other routes
  return NextResponse.next();
}
