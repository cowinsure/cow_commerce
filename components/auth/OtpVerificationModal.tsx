"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/components/ui/Toast";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mobileNumber: string;
  password: string;
  onSuccess: () => void;
}

export function OtpVerificationModal({
  isOpen,
  onClose,
  mobileNumber,
  password,
  onSuccess,
}: OtpVerificationModalProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyOtp, setPassword, register } = useAuth();
  const { showToast } = useToast();

  // Timer for resend OTP
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(180);
      setSuccess(false);
      setIsVerifying(false);
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^[0-9]$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus last filled input
    const lastFilled = newOtp.findIndex((v) => !v);
    if (lastFilled === -1) {
      inputRefs.current[5]?.focus();
    } else {
      inputRefs.current[Math.max(0, lastFilled - 1)]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      return;
    }

    setIsVerifying(true);

    try {
      // Step 1: Verify OTP
      await verifyOtp(mobileNumber, otpCode);
      
      // OTP verified successfully - show success toast and close modal
      showToast("OTP verified successfully", "success");
      onClose();

      // Step 2: Set password (in background)
      try {
        await setPassword(mobileNumber, password);
        // Password set successfully
        showToast("Registration complete", "success");
        onSuccess();
      } catch (passwordErr: unknown) {
        const passwordErrorMessage =
          passwordErr instanceof Error
            ? passwordErr.message
            : "Failed to set password";
        showToast(passwordErrorMessage, "error");
      }
    } catch (err: unknown) {
      // OTP verification failed
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      // Call register API again to resend OTP
      await register({
        mobile_number: mobileNumber,
        role_id: "1",
        latitude: 0,
        longitude: 0,
      });

      setTimeLeft(180);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to resend OTP";
      showToast(errorMessage, "error");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - covers right panel area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/50 backdrop-blur-xs rounded-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:justify-end lg:items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, x: 50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: 50 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success State */}
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Account Created!
                  </h3>
                  <p className="text-gray-500 mb-6">Welcome to Cow Commerce</p>
                  <div className="h-1 bg-green-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Verify Your Account
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Code sent to{" "}
                      <span className="font-medium text-gray-900">
                        {mobileNumber}
                      </span>
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-3 mb-6">
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className={cn(
                            "w-12 h-14 text-center text-xl font-bold rounded-xl border-2",
                            "transition-all duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
                            digit
                              ? "border-green-300 bg-green-50"
                              : "border-gray-200 bg-gray-50",
                            isVerifying && "opacity-50 cursor-not-allowed",
                          )}
                          disabled={isVerifying}
                          aria-label={`Digit ${index + 1}`}
                        />
                      ))}
                    </div>


                    {/* Verify Button */}
                    <button
                      onClick={handleVerify}
                      disabled={isVerifying || otp.join("").length !== 6}
                      className={cn(
                        "w-full py-3 px-4 rounded-xl font-semibold text-white",
                        "transition-all duration-200 transform",
                        "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                        isVerifying || otp.join("").length !== 6
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 active:scale-95",
                      )}
                    >
                      {isVerifying ? (
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
                          Processing data...
                        </span>
                      ) : (
                        "Verify & Continue"
                      )}
                    </button>

                    {/* Resend OTP */}
                    <div className="mt-4 text-center">
                      {timeLeft > 0 ? (
                        <p className="text-gray-400 text-sm">
                          Resend code in{" "}
                          <span className="font-medium text-gray-600">
                            {formatTime(timeLeft)}
                          </span>
                        </p>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleResend}
                          disabled={isResending}
                          className="text-green-600 hover:text-green-700 font-medium text-sm disabled:opacity-50"
                        >
                          {isResending ? (
                            <span className="flex items-center justify-center gap-1">
                              <svg
                                className="w-4 h-4 animate-spin"
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
                              Sending...
                            </span>
                          ) : (
                            "Resend OTP"
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
