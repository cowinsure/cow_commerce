/**
 * Register API
 * Handles user registration
 * Returns registration response data
 */

import apiClient from "@/lib/api/apiClient";
import { AUTH_API } from "@/lib/api/routes";
import {
  SignupRequest,
  SignupResponse,
  OtpVerificationRequest,
  OtpVerificationResponse,
  SetPasswordRequest,
  SetPasswordResponse,
} from "@/lib/models/authDTO";

export async function registerApi(
  data: SignupRequest,
): Promise<SignupResponse> {
  const response = await apiClient.post<
    { statusCode: string; statusMessage: string; data: SignupResponse }
  >(AUTH_API.REGISTER, data);
  return response.data.data;
}

export async function verifyOtpApi(
  data: OtpVerificationRequest,
): Promise<OtpVerificationResponse> {
  const response = await apiClient.post<
    { statusCode: string; statusMessage: string; data: OtpVerificationResponse }
  >(AUTH_API.VERIFY_OTP, data);
  return response.data.data;
}

export async function setPasswordApi(
  data: SetPasswordRequest,
): Promise<SetPasswordResponse> {
  const response = await apiClient.post<
    { statusCode: string; statusMessage: string; data: SetPasswordResponse }
  >(AUTH_API.SET_PASSWORD, data);
  return response.data.data;
}
