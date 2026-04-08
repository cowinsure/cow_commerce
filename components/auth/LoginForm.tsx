/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/theme/theme.config";
import InputField from "../ui/InputField";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginRequest } from "@/lib/models/authDTO";

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
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { login, loading } = useAuth();

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
    clearErrors();
    try {
      const loginData: LoginRequest = {
        mobile_number: data.mobile_number,
        password: data.password,
      };

      await login(loginData);
      
      // Also set cookies via API for middleware to read
      try {
        await fetch("/api/auth/set-cookies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: localStorage.getItem("access_token"),
            refreshToken: localStorage.getItem("refresh_token"),
          }),
        });
      } catch (cookieError) {
        console.error("Failed to set cookies:", cookieError);
        // Continue anyway - localStorage auth will still work
      }
      
      showToast("Login successful", "success");
        
        // Navigate to redirect URL (or home if no redirect) and force refresh
        setTimeout(() => {
          router.push(redirectUrl);
          setTimeout(() => window.location.reload(), 100);
        }, 2000);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed";

      showToast(message, "error");
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
          </label>
        </div>

        {/* Premium Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full h-12 rounded-xl bg-primary text-on-primary font-semibold text-sm",
            "transition-all duration-200 ease-out",
            "hover:bg-primary-container cursor-pointer",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2",
          )}
        >
          {loading ? (
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
      </form>
    </div>
  );
}
