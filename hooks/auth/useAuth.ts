/**
 * Auth Hook
 * Handles authentication business logic and state management
 * Provides login, logout, and auth state to components
 */

import { useState, useCallback, useEffect } from "react";
import { loginApi } from "@/lib/api/auth/login";
import { registerApi, verifyOtpApi, setPasswordApi } from "@/lib/api/auth/register";
import { forgotPasswordApi } from "@/lib/api/auth/forgotPassword";
import { setToken, removeToken, getUserData, isAuthenticated, setUserData } from "@/lib/auth/tokenService";
import { LoginRequest, LoginResponse, SignupRequest, User } from "@/lib/models/authDTO";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  });

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const user = getUserData<User>();
      setState({
        isAuthenticated: authenticated,
        loading: false,
        user,
        error: null,
      });
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await loginApi(credentials);
      console.log("Login API response:", response);
      // Store tokens
      console.log("Storing tokens:", response.access_token, response.refresh_token);
      setToken(response.access_token, response.refresh_token);
      // Store user data
      const user: User = {
        role: response.role,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        is_insurecow_agent: response.is_insurecow_agent,
        is_insurance_agent: response.is_insurance_agent,
        is_enterprise_agent: response.is_enterprise_agent,
        is_superuser: response.is_superuser,
      };
      setUserData(user);
      setState({
        isAuthenticated: true,
        loading: false,
        user,
        error: null,
      });
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: SignupRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await registerApi(data);
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const verifyOtp = useCallback(async (mobile_number: string, otp: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await verifyOtpApi({ mobile_number, otp });
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "OTP verification failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const setPassword = useCallback(async (mobile_number: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await setPasswordApi({ mobile_number, password });
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to set password";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const forgotPassword = useCallback(async (mobile_number: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await forgotPasswordApi({ mobile_number });
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to process request";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    removeToken();
    
    // Also clear server-side httpOnly cookies
    try {
      await fetch("/api/auth/clear-cookies", {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to clear cookies:", error);
    }
    
    setState({
      isAuthenticated: false,
      loading: false,
      user: null,
      error: null,
    });
  }, []);

  const refreshAuth = useCallback(() => {
    const authenticated = isAuthenticated();
    const user = getUserData<User>();
    setState({
      isAuthenticated: authenticated,
      loading: false,
      user,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    register,
    verifyOtp,
    setPassword,
    forgotPassword,
    logout,
    refreshAuth,
    clearError,
  };
}

export default useAuth;