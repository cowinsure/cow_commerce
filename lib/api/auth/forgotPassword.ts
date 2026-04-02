/**
 * Forgot Password API
 * Handles password reset functionality
 * Returns forgot password response data
 */

import apiClient from "@/lib/api/apiClient";
import { AUTH_API } from "@/lib/api/routes";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/lib/models/authDTO";

export async function forgotPasswordApi(
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    AUTH_API.FORGOT_PASSWORD,
    data,
  );
  return response.data;
}
