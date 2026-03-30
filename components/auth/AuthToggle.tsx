"use client";

import { cn } from "@/lib/theme/theme.config";

interface AuthToggleProps {
  mode: "login" | "signup";
  onToggle: (mode: "login" | "signup") => void;
  className?: string;
}

export function AuthToggle({ mode, onToggle, className }: AuthToggleProps) {
  return (
    <div
      className={cn(
        "relative inline-flex p-0.5 rounded-full w-full",
        "border border-outline-variant/30",
        "shadow-inner",
        className,
      )}
    >
      {/* Animated Sliding Pill Background */}
      <div
        className={cn(
          "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full",
          "bg-surface shadow-md shadow-primary/10",
          "border border-outline-variant/20",
          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          mode === "login" ? "left-1.5" : "left-[calc(50%+3px)]",
        )}
      />

      {/* Login Button */}
      <button
        type="button"
        onClick={() => onToggle("login")}
        className={cn(
          "relative z-10 flex-1 py-3 px-6 rounded-full text-sm font-semibold cursor-pointer",
          "transition-all duration-300 ease-out",
          mode === "login"
            ? "text-primary scale-105"
            : "text-gray-400 font-medium hover:text-on-surface",
        )}
      >
        <span className="relative flex items-center justify-center gap-2">
          Sign In
          {/* Subtle dot indicator for active state */}
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full bg-green-500 transition-all duration-300",
              mode === "login" ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
          />
        </span>
      </button>

      {/* Signup Button */}
      <button
        type="button"
        onClick={() => onToggle("signup")}
        className={cn(
          "relative z-10 flex-1 py-3 px-6 rounded-full text-sm font-semibold cursor-pointer",
          "transition-all duration-300 ease-out",
          mode === "signup"
            ? "text-primary scale-105"
            : "text-gray-400 font-medium hover:text-on-surface",
        )}
      >
        <span className="relative flex items-center justify-center gap-2">
          Create Account
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300",
              mode === "signup" ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
          />
        </span>
      </button>
    </div>
  );
}
