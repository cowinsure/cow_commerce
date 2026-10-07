"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import {
  setToken,
  removeToken,
  getUserData,
  isAuthenticated,
  setUserData,
} from "@/lib/auth/tokenService";
import {
  ForgotPasswordRequest,
  LoginRequest,
  SignupRequest,
  SignupResponse,
  OtpVerificationResponse,
  SetPasswordResponse,
  ForgotPasswordResponse,
  User,
} from "@/lib/models/authDTO";
import { loginApi } from "@/lib/api/auth/login";
import { registerApi, setPasswordApi, verifyOtpApi } from "@/lib/api/auth/register";
import { forgotPasswordApi } from "@/lib/api/auth/forgotPassword";

// =========================================================
// TYPES
// =========================================================
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: SignupRequest) => Promise<SignupResponse>;
  verifyOtp: (mobile_number: string, otp: string) => Promise<OtpVerificationResponse>;
  setPassword: (mobile_number: string, password: string) => Promise<SetPasswordResponse>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<ForgotPasswordResponse>;
  logout: () => Promise<void>;
  refreshAuth: () => void;
  clearError: () => void;
}

// =========================================================
// CONTEXT
// =========================================================
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// =========================================================
// PROVIDER
// =========================================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  });
  const initializedRef = useRef(false);

  // ---------------------------------------------------------
  // Initial auth check + cross-tab storage sync
  // ---------------------------------------------------------
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

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

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "access_token" ||
        e.key === "refresh_token" ||
        e.key === "user_data"
      ) {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------
  const login = useCallback(async (credentials: LoginRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await loginApi(credentials);

      // Store tokens
      setToken(response.access_token, response.refresh_token);

      // Set httpOnly cookies for middleware
      try {
        await fetch("/api/auth/set-cookies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          }),
        });
      } catch (cookieError) {
        console.error("Failed to set cookies:", cookieError);
      }

      // Store user data
      const user: User = {
        role: response.role,
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        is_insurecow_agent: response.is_insurecow_agent,
        is_insurance_agent: response.is_insurance_agent,
        is_enterprise_agent: response.is_enterprise_agent,
        is_superuser: response.is_superuser,
        mobile_number: credentials.mobile_number,
      };
      setUserData(user);

      setState({
        isAuthenticated: true,
        loading: false,
        user,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // ---------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------
  const register = useCallback(async (data: SignupRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await registerApi(data);
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // ---------------------------------------------------------
  // VERIFY OTP
  // ---------------------------------------------------------
  const verifyOtp = useCallback(async (mobile_number: string, otp: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await verifyOtpApi({ mobile_number, otp });
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "OTP verification failed";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // ---------------------------------------------------------
  // SET PASSWORD
  // ---------------------------------------------------------
  const setPasswordAction = useCallback(
    async (mobile_number: string, password: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await setPasswordApi({ mobile_number, password });
        setState((prev) => ({ ...prev, loading: false }));
        return response;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to set password";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    [],
  );

  // ---------------------------------------------------------
  // FORGOT PASSWORD
  // ---------------------------------------------------------
  const forgotPassword = useCallback(async (data: ForgotPasswordRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await forgotPasswordApi(data);
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process request";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // ---------------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------------
  const logout = useCallback(async () => {
    // Clear server-side httpOnly cookies first
    try {
      const response = await fetch("/api/auth/clear-cookies", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`Failed to clear cookies: ${response.status}`);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to clear session";
      throw new Error(message);
    }

    // Cookies confirmed cleared — now clear client-side state
    removeToken();

    setState({
      isAuthenticated: false,
      loading: false,
      user: null,
      error: null,
    });
  }, []);

  // ---------------------------------------------------------
  // REFRESH AUTH STATE (manual re-read from storage)
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // CLEAR ERROR
  // ---------------------------------------------------------
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // ---------------------------------------------------------
  // PROVIDER VALUE
  // ---------------------------------------------------------
  const value: AuthContextValue = {
    ...state,
    login,
    register,
    verifyOtp,
    setPassword: setPasswordAction,
    forgotPassword,
    logout,
    refreshAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// =========================================================
// HOOK
// =========================================================
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default useAuth;
