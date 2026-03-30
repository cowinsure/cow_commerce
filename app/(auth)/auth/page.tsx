"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthToggle } from "@/components/auth/AuthToggle";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

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
