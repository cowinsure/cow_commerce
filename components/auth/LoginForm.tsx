/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/theme/theme.config";
import InputField from "../ui/InputField";
import { authService, LoginRequest, LoginResponse } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  mobile_number: z
    .string()
    .min(11, "Mobile number must be 11 digits")
    .max(11, "Mobile number must be 11 digits"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      mobile_number: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    clearErrors();
    try {
      const loginData: LoginRequest = {
        mobile_number: data.mobile_number,
        password: data.password,
      };

      const response = await authService.login(loginData);
      console.log(response);

      if (response.statusCode === "200") {
        // Save auth data (tokens and user data) BEFORE redirecting
        authService.saveAuthData(response.data as unknown as LoginResponse);
        
        // Also set cookies via API for middleware to read
        try {
          const loginResponse = response.data as unknown as LoginResponse;
          await fetch("/api/auth/set-cookies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: loginResponse.access_token,
              refreshToken: loginResponse.refresh_token,
            }),
          });
        } catch (cookieError) {
          console.error("Failed to set cookies:", cookieError);
          // Continue anyway - localStorage auth will still work
        }
        
        showToast(response.data.message || "Login successful", "success");
        router.push("/");
        console.log("Login successful:", response.data);
      } else {
        showToast(response.data.message || "Login failed", "error");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";

      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Minimal Modern Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-on-surface mb-2">
          Welcome back
          <span className="text-primary">!</span>
        </h1>
        <p className="text-on-surface-variant text-sm">
          Enter your credentials to access your account
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-5 ", className)}
      >
        <InputField
          label="Mobile Number"
          id="mobile_number"
          {...register("mobile_number")}
          type="tel"
          placeholder="Enter your mobile number"
          error={errors.mobile_number?.message}
          inputMode="numeric"
          onInput={(e: any) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
        />

        {/* Password Input with Toggle */}
        <div className="relative">
          <InputField
            label="Password"
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            style={{ top: "calc(50% + 16px)" }}
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 3D Pop-out Checkbox */}
        <div className="flex items-center gap-2 py-3 group -mt-5">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <input
              id="remember"
              type="checkbox"
              className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              {...register("rememberMe")}
            />

            {/* Custom Checkbox Container */}
            <div
              className="w-5 h-5 rounded-md border-2 border-gray-300 bg-surface 
                    peer-checked:bg-green-200 peer-checked:border-green-300
                    peer-focus:ring-2 peer-focus:ring-primary/20 
                    transition-all duration-200 ease-out
                    group-hover:border-primary/50 flex items-center justify-center
                    shadow-sm peer-checked:shadow-md peer-checked:shadow-primary/30
                    pointer-events-none relative z-0"
            ></div>

            {/* 3D Pop-out Checkmark */}
            <svg
              className="absolute w-6 h-6 text-primary opacity-0 peer-checked:opacity-100 
                 transform scale-50 peer-checked:scale-110 transition-all duration-300 ease-out
                 drop-shadow-lg pointer-events-none z-20 -translate-y-0.5 translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3.5}
              style={{
                filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.3))",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                className="transform origin-center"
              />
            </svg>

            {/* Ripple Effect */}
            <div
              className="absolute inset-0 rounded-md bg-primary/20 scale-0 peer-active:scale-150 
                    transition-transform duration-300 opacity-0 peer-active:opacity-100 
                    pointer-events-none"
            />
          </div>

          <label
            htmlFor="remember"
            className="text-sm font-medium text-on-surface-variant cursor-pointer select-none
               group-hover:text-on-surface transition-colors duration-200"
          >
            Keep me signed in
            {/* <span className="block text-xs text-outline font-normal mt-0.5">
            Not recommended on shared devices
          </span> */}
          </label>
        </div>

        {/* Premium Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm",
            "transition-all duration-200 ease-out",
            "hover:bg-primary-container cursor-pointer",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2",
          )}
        >
          {isSubmitting ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-30"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>
        {/* Social Login Divider */}
        {/* <div className="relative flex items-center py-4">
        <div className="grow border-t border-outline-variant/30" />
        <span className="shrink mx-4 text-xs font-bold text-outline uppercase tracking-widest">
          or continue with
        </span>
        <div className="grow border-t border-outline-variant/30" />
      </div> */}

        {/* Social Login Buttons */}
        {/* <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            useToast().showToast("Google login coming soon!", "info")
          }
          className="flex items-center justify-center gap-3 h-12 bg-surface-container-low border border-outline-variant/20 rounded-full hover:bg-white transition-all text-sm font-semibold text-on-surface"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() =>
            useToast().showToast("Apple ID login coming soon!", "info")
          }
          className="flex items-center justify-center gap-3 h-12 bg-surface-container-low border border-outline-variant/20 rounded-full hover:bg-white transition-all text-sm font-semibold text-on-surface"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.81.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Apple ID
        </button>
      </div> */}
      </form>
    </div>
  );
}
