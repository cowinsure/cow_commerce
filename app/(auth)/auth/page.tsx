/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthToggle } from "@/components/auth/AuthToggle";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { isAuthenticated } from "@/lib/auth/tokenService";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

function AuthContent() {
  // Default to login mode to match server-side rendering
  const [mode, setMode] = useState<AuthMode>("login");
  const { showToast } = useToast();
  const router = useRouter();

  // Check URL and auth on client-side after mount (avoids hydration mismatch)
  useEffect(() => {
    // Check URL for signup param
    const urlParams = new URLSearchParams(window.location.search);
    const signup = urlParams.get("signup");
    if (signup === "true") {
      setMode("signup");
    }

    // Check if user is already authenticated
    if (isAuthenticated()) {
      showToast(
        "You are already logged in. Please logout first to access this page.",
        "error",
      );
      router.push("/");
    }
  }, [showToast, router]);

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Mode toggle */}
        <div className="mb-8">
          <AuthToggle mode={mode} onToggle={setMode} />
        </div>

        {/* Forms with smooth transition */}
        <div className="min-h-112.5">
          {mode === "login" ? (
            <div key="login" className="animate-fade-in">
              <LoginForm />
            </div>
          ) : (
            <div key="signup" className="animate-fade-in">
              <SignupForm />
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}

export default function AuthPage() {
  return <AuthContent />;
}
