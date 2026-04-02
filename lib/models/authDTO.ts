/**
 * Auth DTOs
 * Request and Response interfaces for authentication
 */

// ==================== REQUEST DTOS ====================

export interface LoginRequest {
  mobile_number: string;
  password: string;
}

export interface SignupRequest {
  mobile_number: string;
  role_id: string;
  latitude: number;
  longitude: number;
}

export interface OtpVerificationRequest {
  mobile_number: string;
  otp: string;
}

export interface SetPasswordRequest {
  mobile_number: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  mobile_number: string;
}

// ==================== RESPONSE DTOS ====================

export interface LoginResponse {
  message: string;
  role: string;
  access_token: string;
  refresh_token: string;
  is_insurecow_agent: boolean;
  is_insurance_agent: boolean;
  is_enterprise_agent: boolean;
  is_superuser: boolean;
}

export interface SignupResponse {
  message: string;
  status: string;
}

export interface OtpVerificationResponse {
  message: string;
  status: string;
}

export interface SetPasswordResponse {
  message: string;
  status: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface ForgotPasswordResponse {
  message: string;
  status: string;
}

// ==================== USER MODEL ====================

export interface User {
  role: string;
  access_token: string;
  refresh_token: string;
  is_insurecow_agent: boolean;
  is_insurance_agent: boolean;
  is_enterprise_agent: boolean;
  is_superuser: boolean;
}

// ==================== API RESPONSE WRAPPER ====================

export interface ApiResponse<T> {
  statusCode: string;
  statusMessage: string;
  data: T;
}
