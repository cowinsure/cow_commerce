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
    // Extract backend message if available - prioritize it over generic axios error
    // Try multiple paths: response.data.message, response.data.data.message
    const backendMessage = 
      error.response?.data?.message || 
      error.response?.data?.data?.message ||
      error.response?.statusText;
    if (backendMessage) {
      error.message = backendMessage;
    }

    // Handle 401 Unauthorized - token expired or invalid
    // Only redirect if we actually have a token (user was authenticated)
    if (error.response?.status === 401) {
      const hasToken = typeof window !== "undefined" && !!localStorage.getItem("access_token");
      
      if (hasToken) {
        // User was authenticated but token expired - redirect to login
        removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/auth?expired=true";
        }
      }
      // If no token, user is already logged out - don't redirect
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Public API client - for guest/public users
// Uses a hardcoded guest token that has read-only permissions
const PUBLIC_GUEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0OTAyMjg1MDc5LCJpYXQiOjE3NDg2ODUwNzksImp0aSI6ImRmZGY1ZTBjODYzODRlZDhhZTRiNzJhOTE0YjJhYzNkIiwidXNlcl9pZCI6M30.-pqxLUI9Ojxl1bpcnxVge3VkxU5U7DBF6Kn5ZVY-6G0";

export const publicApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add guest token to public API requests
publicApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${PUBLIC_GUEST_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for public API - also extract backend messages
publicApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = 
      error.response?.data?.message || 
      error.response?.data?.data?.message ||
      error.response?.statusText;
    if (backendMessage) {
      error.message = backendMessage;
    }
    return Promise.reject(error);
  }
);