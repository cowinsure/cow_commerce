"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/theme/theme.config";
import InputField from "../ui/InputField";
import { useAuth } from "@/hooks/auth/useAuth";
import { SignupRequest } from "@/lib/models/authDTO";
import { OtpVerificationModal } from "./OtpVerificationModal";
import { motion } from "framer-motion";
import { resumePluginState } from "next/dist/build/build-context";

const signupSchema = z
  .object({
    mobile_number: z
      .string()
      .regex(/^(?:\+880|880|0)?1[3-9]\d{8}$/, "Enter a valid mobile number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [shakeCheckbox, setShakeCheckbox] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [signupSession, setSignupSession] = useState<{
    mobile_number: string;
    password: string;
  } | null>(null);
  const { showToast } = useToast();
  const { register: registerApi } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      mobile_number: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Strip +88 or +880 prefix from mobile number for backend
  const normalizeMobileNumber = (mobile: string): string => {
    // Remove +880, +88, 880, or leading 0 to get the raw number
    return mobile.replace(/^\+?(880|88)?/, "");
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    clearErrors();

    // Custom validation for terms agreement
    if (!termsAgreed) {
      setTermsError(
        "You must agree to the Terms of Service and Privacy Policy",
      );
      setShakeCheckbox(true);
      setTimeout(() => setShakeCheckbox(false), 500);
      setIsSubmitting(false);
      return;
    } else {
      setTermsError("");
    }

    try {
      // Normalize mobile number: strip +88/+880 prefix for backend
      const normalizedMobile = normalizeMobileNumber(data.mobile_number);

      // Step 1: Register with mobile number (geolocation optional)
      const registerData: SignupRequest = {
        mobile_number: normalizedMobile,
        role_id: "1", // Default role ID for users
        latitude: 0, // Optional - can be updated later
        longitude: 0, // Optional - can be updated later
      };

      const registerResponse = await registerApi(registerData);

      // If we get here without an error, the register was successful
      // The response contains {message: "OTP sent successfully.", results: []}
      if (registerResponse && registerResponse.message) {
        // Store in memory (NOT localStorage for security)
        // Store normalized number to use in OTP verification and password set
        setSignupSession({
          mobile_number: normalizedMobile,
          password: data.password,
        });

        // Open OTP modal
        setIsOtpModalOpen(true);
      } else {
        showToast(registerResponse.message || "Registration failed", "error");
      }
    } catch (error: unknown) {
      // Show backend error message if available
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSuccess = () => {
    // Close modal
    setIsOtpModalOpen(false);
    
    // Show success toast
    showToast("Account created successfully! Please login.", "success");
    
    // Clear form
    reset();
    setSignupSession(null);
    setTermsAgreed(false);
  };

  const handleOtpClose = () => {
    setIsOtpModalOpen(false);
    // Note: We keep signupSession in case user wants to retry
    // It will be cleared on successful signup or page refresh
  };

  return (
    <div>
      {/* Minimal Modern Heading */}
      <div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Create account
          <span className="text-green-700">!</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 text-sm"
        >
          Join us to manage your farm operations
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-5", className)}
      >
        {/* Mobile Number Input */}
        <InputField
          label="Mobile Number"
          id="signup-mobile_number"
          type="tel"
          placeholder="Enter your mobile number"
          autoComplete="tel"
          error={errors.mobile_number?.message}
          {...register("mobile_number")}
        />

        {/* Password Input with Toggle */}
        <div className="relative">
          <InputField
            label="Password"
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
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
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Confirm Password Input with Toggle */}
        <div className="relative">
          <InputField
            label="Confirm Password"
            id="signup-confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            style={{ top: "calc(50% + 16px)" }}
          >
            {showConfirmPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Terms and Conditions - 3D Pop-out Checkbox */}
        <div className="flex items-center gap-2 py-2 group">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <input
              id="terms"
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => {
                setTermsAgreed(e.target.checked);
                if (e.target.checked) setTermsError("");
              }}
              className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Custom Checkbox Container */}
            <div
              className={cn(
                "w-5 h-5 rounded-md border-2 bg-white",
                "peer-focus:ring-2 peer-focus:ring-green-600/20",
                "transition-all duration-200 ease-out",
                "group-hover:border-green-500 flex items-center justify-center",
                "shadow-sm peer-checked:shadow-md peer-checked:shadow-green-600/30",
                "pointer-events-none relative z-0",
                termsError
                  ? "border-red-300 peer-checked:bg-red-50 peer-checked:border-red-300"
                  : "border-gray-300 peer-checked:bg-green-200 peer-checked:border-green-300"
              )}
            ></div>

            {/* 3D Pop-out Checkmark */}
            <svg
              className={cn(
                "absolute w-6 h-6 text-green-600 opacity-0",
                "peer-checked:opacity-100 transform scale-50 peer-checked:scale-110",
                "transition-all duration-300 ease-out drop-shadow-lg",
                "pointer-events-none z-20 -translate-y-0.5 translate-x-0.5",
                termsError && "text-red-500"
              )}
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
              className="absolute inset-0 rounded-md bg-green-600/20 scale-0 peer-active:scale-150 
                    transition-transform duration-300 opacity-0 peer-active:opacity-100 
                    pointer-events-none"
            />
          </div>

          <label
            htmlFor="terms"
            className="text-sm font-medium text-gray-500 cursor-pointer select-none
               group-hover:text-gray-700 transition-colors duration-200"
          >
            I agree to the{" "}
            <a href="/terms" className="text-gray-900 font-semibold underline decoration-green-500 underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-gray-900 font-semibold underline decoration-green-500 underline-offset-2">
              Privacy Policy
            </a>
          </label>
        </div>
        {termsError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {termsError}
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full py-4 px-6 rounded-xl font-semibold text-white",
            "transition-all duration-200 transform",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
            "shadow-lg shadow-green-600/20",
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </motion.button>
      </motion.form>

      {/* OTP Verification Modal */}
      {signupSession && (
        <OtpVerificationModal
          isOpen={isOtpModalOpen}
          onClose={handleOtpClose}
          mobileNumber={signupSession.mobile_number}
          password={signupSession.password}
          onSuccess={handleOtpSuccess}
        />
      )}
    </div>
  );
}
