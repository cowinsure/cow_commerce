/**
 * Token Service
 * Wrapper for localStorage token management
 * All token operations should go through this service
 */

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_DATA_KEY = "user_data";

/**
 * Get access token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get refresh token from localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Set access and refresh tokens in localStorage
 */
export function setToken(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  console.log("setToken called with:", accessToken, refreshToken);
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  // Also set cookies for middleware
  setCookie(ACCESS_TOKEN_KEY, accessToken);
  setCookie(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Remove tokens from localStorage
 */
export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  // Clear cookies
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
}

/**
 * Get user data from localStorage
 */
export function getUserData<T>(): T | null {
  if (typeof window === "undefined") return null;
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
}

/**
 * Set user data in localStorage
 */
export function setUserData<T>(userData: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Helper to set cookie (client-side)
 */
function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Helper to delete cookie
 */
function deleteCookie(name: string): void {
  if (typeof window === "undefined") return;
  const variations = [
    `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`,
    `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`,
    `${name}=;max-age=-1;path=/`,
  ];
  variations.forEach((cookie) => {
    document.cookie = cookie;
  });
}