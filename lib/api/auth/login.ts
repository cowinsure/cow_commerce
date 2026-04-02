/**
 * Login API
 * Handles user authentication
 * Returns login response data
 */

import apiClient from "@/lib/api/apiClient";
import { AUTH_API } from "@/lib/api/routes";
import { LoginRequest, LoginResponse } from "@/lib/models/authDTO";

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<{ statusCode: string; statusMessage: string; data: LoginResponse }>(AUTH_API.LOGIN, data);
  console.log("API Response:", response);
  console.log("Response Data:", response.data);
  return response.data.data;
}