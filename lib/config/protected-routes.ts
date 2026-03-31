/**
 * Route Protection Utilities
 * 
 * Client-side functions to check route protection status.
 * Used by Navbar and other components to conditionally render UI.
 * 
 * For server-side protection, see middleware.ts
 */

import { isPublicRoute, isProtectedRoute, routeConfig } from "./routes";

/**
 * Check if user can access a specific route
 * Returns true if route is accessible for current auth state
 */
export function canAccessRoute(pathname: string, isAuthenticated: boolean): boolean {
  // If user is authenticated, they can access both public and protected routes
  if (isAuthenticated) {
    return true;
  }

  // If user is not authenticated, check if route is public
  return isPublicRoute(pathname);
}

/**
 * Check if a route link should be visible in navigation
 * Protected routes only show when user is logged in
 */
export function shouldShowNavLink(
  href: string, 
  isAuthenticated: boolean
): boolean {
  // Skip API routes
  if (href.startsWith("/api")) {
    return false;
  }

  // Skip auth routes when authenticated (optional, can toggle)
  if (href.startsWith("/auth") && isAuthenticated) {
    return false;
  }

  // Check if route is protected
  if (isProtectedRoute(href)) {
    // Show only if authenticated
    return isAuthenticated;
  }

  // Show all public routes
  return true;
}

/**
 * Filter navigation links based on auth status
 * Returns only the links that should be visible
 */
export function filterNavLinks<T extends { href: string }>(
  links: T[], 
  isAuthenticated: boolean
): T[] {
  return links.filter((link) => shouldShowNavLink(link.href, isAuthenticated));
}

/**
 * Get redirect URL for unauthenticated users
 */
export function getUnauthenticatedRedirectUrl(pathname: string): string {
  // Don't redirect to auth pages
  if (pathname.startsWith("/auth")) {
    return "/";
  }
  return `/auth?redirect=${encodeURIComponent(pathname)}`;
}

/**
 * Get redirect URL for authenticated users (e.g., after login)
 */
export function getAuthenticatedRedirectUrl(pathname: string): string {
  return pathname;
}

// Re-export route config for convenience
export { routeConfig };
