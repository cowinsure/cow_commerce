/**
 * API Client
 * Central axios instance for making HTTP requests
 * All API calls should go through this client
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getToken, removeToken } from "@/lib/auth/tokenService";

// Create axios instance with base URL from environment
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds auth token to headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      removeToken();
      // Optional: redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/auth?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;