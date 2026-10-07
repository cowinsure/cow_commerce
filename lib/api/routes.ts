/**
 * API Routes
 * Central configuration for all API endpoints
 * No hardcoded URLs should be used in API files
 *
 * Public endpoints  → use publicApiClient (guest token, no login required)
 * Authenticated     → use apiClient (requires user token)
 */

// ==================== PUBLIC ENDPOINTS ====================
// Accessible without login. Uses publicApiClient.

export const PRODUCT_API = {
  GET_PRODUCTS: "/invms/inventory-livestock-item-map-service/",
  GET_PRODUCT_BY_ID: (id: number) => `/lms/assets-service/${id}/`,
  GET_COW_DETAILS: "/lms/assets-service/",
} as const;

export const BREED_API = {
  GET_BREEDS: "/lms/breed-service/",
} as const;

// ==================== AUTHENTICATED ENDPOINTS ====================
// Require a logged-in user. Uses apiClient.

export const AUTH_API = {
  LOGIN: "/auth/login-service/",
  REGISTER: "/v1/auth/public/register/step1/",
  VERIFY_OTP: "/v1/auth/public/register/verify-otp/",
  SET_PASSWORD: "/v1/auth/public/register/set-password/",
  REFRESH_TOKEN: "/v1/auth/public/refresh-token/",
  FORGOT_PASSWORD: "/v1/auth/public/forgot-password/",
} as const;

export const ORDER_API = {
  GET_ORDERS: "/invms/inventory-ecom-order-service/",
  GET_ORDER_BY_ID: (id: number, organization_id: number) =>
    `/invms/inventory-ecom-order-service/?id=${id}&organization_id=${organization_id}`,
  CREATE_ORDER: "/invms/inventory-ecom-order-service/",
  PROCESS_ORDER: "/invms/inventory-ecom-process-order-service/",
} as const;

export const PERSONALINFO_SERVICE_API = {
  CREATE_PERSONAL_INFO: "/v1/auth/user/personal-info/",
  GET_PERSONAL_INFO: "/v1/auth/user/personal-info/",
} as const;

export const DELIVERY_SERVICE_API = {
  GET_DELIVERY_TYPES: "/invms/inventory-shipping-method-service/",
} as const;

export const PAYMENT_TYPE_API = {
  GET_PAYMENT_TYPES: "/invms/inventory-payment-type-service/",
} as const;

// Type for combining all API routes
export type ApiRoutes =
  | typeof AUTH_API
  | typeof ORDER_API
  | typeof PRODUCT_API
  | typeof PAYMENT_TYPE_API
  | typeof BREED_API
  | typeof DELIVERY_SERVICE_API
  | typeof PERSONALINFO_SERVICE_API;
