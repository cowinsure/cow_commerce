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
    const response = await apiClient.post<{
      statusCode: string;
      statusMessage: string;
      data: LoginResponse | unknown[];
      message: string;
      status: string;
    }>(AUTH_API.LOGIN, data);

    const responseData = response.data;

    if (responseData.status === "failed" || responseData.statusCode === "failed") {
      const msg = responseData.message || responseData.statusMessage || "Login failed";
      throw new Error(msg);
    }

    const payload = responseData.data;
    if (!payload || Array.isArray(payload)) {
      const msg = responseData.message || "Invalid credentials";
      throw new Error(msg);
    }

    return payload as LoginResponse;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string; name?: string };
    const message =
      axiosError?.response?.data?.message || axiosError?.message || "Login failed";
    if (typeof message !== "string") {
      throw new Error("Login failed");
    }
    const newError = new Error(message);
    if (typeof axiosError?.name === "string") {
      newError.name = axiosError.name;
    }
    throw newError;
  }
}
