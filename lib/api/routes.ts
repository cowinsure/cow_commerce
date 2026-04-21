/**
 * API Routes
 * Central configuration for all API endpoints
 * No hardcoded URLs should be used in API files
 */

// Auth endpoints
export const AUTH_API = {
  LOGIN: "/v1/auth/public/login/",
  REGISTER: "/v1/auth/public/register/",
  VERIFY_OTP: "/v1/auth/public/register/verify-otp/",
  SET_PASSWORD: "/v1/auth/public/register/set-password/",
  REFRESH_TOKEN: "/v1/auth/public/refresh-token/",
  FORGOT_PASSWORD: "/v1/auth/public/forgot-password/",
} as const;

// Order endpoints
export const ORDER_API = {
  CREATE_ORDER: "",
  GET_ORDERS: "/invms/inventory-ecom-order-service/",
  GET_ORDER_BY_ID: (id: number) =>
    `/invms/inventory-ecom-order-service/?id=${id}`,
  PROCESS_ORDER: "/invms/inventory-ecom-process-order-service/",
  UPDATE_ORDER: (id: string) => ``,
  CANCEL_ORDER: (id: string) => ``,
} as const;

// Product endpoints
export const PRODUCT_API = {
  GET_PRODUCTS: "/invms/inventory-livestock-item-map-service/",
  GET_PRODUCT_BY_ID: (id: number) => `/lms/assets-service/${id}/`,
  // SEARCH_PRODUCTS: "/v1/products/search/",
  // GET_CATEGORIES: "/v1/products/categories/",
} as const;

// Payment type service endpoints
export const PAYMENT_TYPE_API = {
  GET_PAYMENT_TYPES: "/invms/inventory-payment-type-service/",
} as const;

// Breed service endpoints
export const BREED_API = {
  GET_BREEDS: "/lms/breed-service/",
} as const;

// Type for combining all API routes
// export type ApiRoutes = typeof AUTH_API | typeof ORDER_API | typeof PRODUCT_API;
export type ApiRoutes =
  | typeof AUTH_API
  | typeof PRODUCT_API
  | typeof PAYMENT_TYPE_API;
