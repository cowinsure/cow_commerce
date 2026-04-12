/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Login API
 * Handles user authentication
 * Returns login response data
 */

import apiClient from "@/lib/api/apiClient";
import { AUTH_API } from "@/lib/api/routes";
import { LoginRequest, LoginResponse } from "@/lib/models/authDTO";

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<{ statusCode: string; statusMessage: string; data: LoginResponse }>(AUTH_API.LOGIN, data);
    return response.data.data;
  } catch (error: any) {
    // Extract backend message from error response
    const message = error?.response?.data?.message || error?.message || "Login failed";
    const newError = new Error(message);
    newError.name = error?.name;
    throw newError;
  }
}