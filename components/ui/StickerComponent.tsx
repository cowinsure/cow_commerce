"use client";

import { cn } from "@/lib/theme/theme.config";
import { motion } from "framer-motion";
import { Sparkles, Tag, Percent, Clock, Zap } from "lucide-react";

interface ForSaleStickerProps {
  variant?: "default" | "urgent" | "discount" | "limited";
  discount?: number; // e.g., 20 for 20% off
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const variants = {
  default: {
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    shadow: "",
    icon: Tag,
    text: "FOR SALE",
    subtext: "Premium",
  },
  urgent: {
    bg: "bg-gradient-to-br from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/30",
    icon: Zap,
    text: "HOT DEAL",
    subtext: "Selling Fast",
  },
  discount: {
    bg: "bg-gradient-to-br from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/30",
    icon: Percent,
    text: "SAVE",
    subtext: "Limited Time",
  },
  limited: {
    bg: "bg-gradient-to-br from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/30",
    icon: Clock,
    text: "RARE",
    subtext: "Few Left",
  },
};

export function ForSaleSticker({
  variant = "default",
  discount,
  className,
  position = "top-right",
}: ForSaleStickerProps) {
  const config = variants[variant];
  const Icon = config.icon;

  const positionClasses = {
    "top-left": "-top-3 -left-3",
    "top-right": "-top-3 -right-3",
    "bottom-left": "-bottom-3 -left-3",
    "bottom-right": "-bottom-3 -right-3",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={cn("absolute z-20", positionClasses[position], className)}
    >
      {/* Main Badge */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center",
          "w-16 h-16 rounded-2xl",
          config.bg,
          "text-white font-black",
          "shadow-lg",
          config.shadow,
          "border-2 border-white/20",
          "overflow-hidden",
        )}
      >
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Corner fold effect */}
        <div
          className={cn(
            "absolute -bottom-2 -right-2 w-6 h-6 bg-black/20 rounded-full blur-sm",
            position.includes("right") ? "right-auto -left-2" : "",
          )}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Icon className="w-5 h-5 mb-0.5" />
          </motion.div>

          {discount ? (
            <span className="text-2xl leading-none">{discount}%</span>
          ) : (
            <span className="text-[10px] leading-tight tracking-wider text-center">
              {config.text}
            </span>
          )}

          {!discount && (
            <span className="text-[7px] font-medium opacity-90 tracking-wide">
              {config.subtext}
            </span>
          )}
        </div>

        {/* Pulse ring for attention */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Floating particles */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
        animate={{ y: [-2, -8, -2], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/60 rounded-full"
        animate={{ y: [0, -6, 0], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </motion.div>
  );
}

// Simpler version for minimal designs
export function SimpleForSaleBadge({
  className,
  position = "top-right",
}: {
  className?: string;
  position?: "top-left" | "top-right";
}) {
  const positionClasses = {
    "top-left": "-top-2 -left-2",
    "top-right": "-top-2 -right-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring" }}
      className={cn("absolute z-20", positionClasses[position], className)}
    >
      <div className="relative">
        {/* Main badge */}
        <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
          FOR SALE
        </div>

        {/* Subtle ping animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

// Ribbon style variant
export function RibbonForSale({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: -50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      className={cn(
        "absolute -top-2 -right-2 z-20 overflow-hidden w-32 h-32",
        className,
      )}
    >
      <div className="absolute top-0 right-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-xs font-bold py-1 px-8 transform rotate-45 translate-x-8 translate-y-4 shadow-lg w-40 text-center">
        FOR SALE
      </div>
    </motion.div>
  );
}
