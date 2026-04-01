/**
 * Route Configuration
 * 
 * This file defines which routes are protected (require authentication)
 * and which are public. Easy to add/remove routes in the future.
 * 
 * Add new routes to either `publicRoutes` or `protectedRoutes` array.
 */

export interface RouteConfig {
  /** Routes accessible without authentication */
  publicRoutes: string[];
  /** Routes that require authentication */
  protectedRoutes: string[];
  /** Routes that redirect authenticated users away (like login/signup) */
  authRoutes: string[];
  /** Custom callback for additional route checks */
  customCheck?: (pathname: string) => boolean;
}

/**
 * Define your routes here
 * 
 * Format:
 * - Exact match: "/route"
 * - Wildcard match: "/route/*" - matches /route and all sub-routes
 */
export const routeConfig: RouteConfig = {
  // Routes accessible to everyone (public)
  publicRoutes: [
    "/",
    "/about",
    "/marketplace",
    "/cows/*", // Individual cow details
  ],

  // Routes requiring authentication
  protectedRoutes: [
    "/order-history",
    "/checkout",
    "/profile",
  ],

  // Routes that redirect authenticated users (e.g., login page)
  authRoutes: [
    "/auth",
  ],
};

/**
 * Check if a route is public (doesn't require authentication)
 */
export function isPublicRoute(pathname: string): boolean {
  const { publicRoutes, authRoutes } = routeConfig;
  
  return [
    ...publicRoutes,
    ...authRoutes,
  ].some((route) => matchRoute(route, pathname));
}

/**
 * Check if a route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const { protectedRoutes } = routeConfig;
  
  return protectedRoutes.some((route) => matchRoute(route, pathname));
}

/**
 * Check if a route is an auth route (redirects logged-in users)
 */
export function isAuthRoute(pathname: string): boolean {
  const { authRoutes } = routeConfig;
  
  return authRoutes.some((route) => matchRoute(route, pathname));
}

/**
 * Match a route pattern against a pathname
 * Supports exact match and wildcard patterns
 * 
 * @param pattern - Route pattern (e.g., "/cows/*" or "/about")
 * @param pathname - Actual pathname to check
 */
function matchRoute(pattern: string, pathname: string): boolean {
  // Exact match
  if (pattern === pathname) {
    return true;
  }

  // Wildcard match (e.g., "/cows/*" matches "/cows/123")
  if (pattern.endsWith("/*")) {
    const basePath = pattern.slice(0, -2); // Remove "/*"
    return pathname.startsWith(basePath);
  }

  return false;
}

/**
 * Get all protected route paths for middleware configuration
 * Returns patterns that Next.js middleware can use
 */
export function getProtectedRoutePatterns(): string[] {
  return routeConfig.protectedRoutes;
}

/**
 * Get the login redirect URL with return URL
 */
export function getLoginRedirectUrl(currentPath: string): string {
  // Don't redirect to auth routes or API routes
  if (currentPath.startsWith("/auth") || currentPath.startsWith("/api")) {
    return "/";
  }
  return `/auth?redirect=${encodeURIComponent(currentPath)}`;
}
