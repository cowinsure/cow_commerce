"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthToggle } from "@/components/auth/AuthToggle";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { authService } from "@/lib/api/auth";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    if (authService.isAuthenticated()) {
      showToast("You are already logged in. Please logout first to access this page.", "error");
      router.push("/");
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIsLoading(false);
    }
  }, [showToast, router]);

  // Don't render anything while checking auth
  if (isLoading) {
    return null;
  }

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
