"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/theme/theme.config";
import { FaFacebook } from "react-icons/fa6";

interface CircularShareMenuProps {
  shareUrl?: string;
  shareTitle?: string;
  className?: string;
}

export function CircularShareMenu({
  shareUrl = typeof window !== "undefined" ? window.location.href : "",
  shareTitle = "Check out this premium cow!",
  className,
}: CircularShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      id: "whatsapp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      shadow: "shadow-green-500/30",
      label: "",
      action: () => {
        const text = encodeURIComponent(`${shareTitle} ${shareUrl}`);
        window.open(`https://wa.me/?text=${text}`, "_blank");
      },
    },
    {
      id: "facebook",
      icon: FaFacebook,
      color: "bg-blue-600 hover:bg-blue-700",
      shadow: "shadow-blue-600/30",
      label: "",
      action: () => {
        const url = encodeURIComponent(shareUrl);
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank",
        );
      },
    },
  ];

  // Calculate positions for circular arrangement
  const radius = 60; // Distance from center
  const angleStep = 60; // Degrees between items (60° apart for 2 items)
  const startAngle = -30; // Start from top-right area

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Share Options - Circular Formation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {shareOptions.map((option, index) => {
              const angle = (startAngle + index * angleStep) * (Math.PI / 180);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={option.id}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x,
                    y,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={option.action}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-11 h-11 rounded-full flex items-center justify-center",
                    "text-white shadow-lg",
                    option.color,
                    option.shadow,
                    "z-20 cursor-pointer",
                  )}
                  title={option.label}
                >
                  <option.icon className="w-5 h-5" fill="currentColor" />

                  {/* Label tooltip */}
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 whitespace-nowrap"
                  >
                    {option.label}
                  </motion.span>
                </motion.button>
              );
            })}

            {/* Connecting lines/arc (optional visual flair) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border-2 border-emerald-300 border-dashed pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Share Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 45 : 0,
          backgroundColor: isOpen ? "#ecfdf5" : "#f1f5f9",
        }}
        className={cn(
          "relative z-30 p-3 rounded-full",
          "bg-slate-100 hover:bg-emerald-50",
          "transition-colors cursor-pointer",
          isOpen && "bg-emerald-50 text-emerald-600",
        )}
      >
        <Share2
          className={cn(
            "w-5 h-5 transition-colors",
            isOpen ? "text-emerald-600" : "text-slate-600",
          )}
        />

        {/* Pulse ring when open */}
        {isOpen && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-emerald-400"
          />
        )}
      </motion.button>
    </div>
  );
}

// Compact version with just the essential animation
export function SimpleCircularShare({
  shareUrl,
  shareTitle,
  className,
}: CircularShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      icon: MessageCircle,
      color: "bg-green-500",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
    },
    {
      icon: FaFacebook,
      color: "bg-blue-600",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || "")}`,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-12 h-12",
        className,
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {options.map((opt, i) => {
        const angle = (i === 0 ? -45 : 45) * (Math.PI / 180);
        const x = Math.cos(angle) * 50;
        const y = Math.sin(angle) * 50;

        return (
          <motion.a
            key={i}
            href={opt.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={
              isOpen
                ? { x, y, opacity: 1, scale: 1 }
                : { x: 0, y: 0, opacity: 0, scale: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: i * 0.05,
            }}
            whileHover={{ scale: 1.2 }}
            className={cn(
              "absolute w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg",
              opt.color,
            )}
          >
            <opt.icon className="w-5 h-5" fill="currentColor" />
          </motion.a>
        );
      })}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className={cn(
          "relative z-10 p-3 rounded-full bg-slate-100 hover:bg-emerald-50",
          isOpen && "bg-emerald-100 text-emerald-600",
        )}
      >
        <Share2 className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
