"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/theme/theme.config";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomDropDownProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
}

export function CustomDropDown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  dropdownClassName,
}: CustomDropDownProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((opt) => opt.value === value);

  const handleClose = useCallback(() => setOpen(false), []);

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 8,
      left: rect.left,
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    updateCoords();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    const handleScroll = () => updateCoords();
    const handleResize = () => updateCoords();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, handleClose, updateCoords]);

  const handleToggle = () => {
    if (!open) {
      updateCoords();
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    handleClose();
  };

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-dropdown-option]')) {
        e.stopPropagation();
      }
    };
    document.addEventListener('mousedown', handleMouseDown, true);
    return () => document.removeEventListener('mousedown', handleMouseDown, true);
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={handleToggle}
        className={cn(
          "group flex min-h-[42px] lg:min-w-[150px] items-center justify-between gap-3",
          "rounded-xl border px-3.5 py-2",
          "bg-white text-sm font-medium",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          "transition-all duration-200",
          "cursor-pointer",
          open
            ? "border-emerald-400 ring-4 ring-emerald-500/10"
            : "border-slate-200 hover:border-slate-300 hover:shadow-sm",
        )}
      >
        <span
          className={cn(
            "truncate transition-colors duration-200",
            selected
              ? "text-slate-700"
              : "text-slate-400 group-hover:text-slate-500",
          )}
        >
          {selected ? selected.label : placeholder}
        </span>

        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
            "bg-slate-50 transition-all duration-200",
            "group-hover:bg-emerald-50",
            open && "bg-emerald-50",
          )}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-colors duration-200",
                open
                  ? "text-emerald-600"
                  : "text-slate-400 group-hover:text-slate-600",
              )}
            />
          </motion.div>
        </span>
      </motion.button>

      {/* Dropdown */}
      {open &&
        coords &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 0,
                y: 6,
                scale: 0.97,
                filter: "blur(3px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 6,
                scale: 0.97,
                filter: "blur(3px)",
              }}
              transition={{
                duration: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "fixed z-[9999] min-w-[180px]",
                "overflow-hidden rounded-2xl",
                "border border-slate-200/80",
                "bg-white/95 backdrop-blur-xl",
                "p-1.5",
                "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.18)]",
                dropdownClassName,
              )}
              style={{
                top: coords.top,
                left: coords.left,
              }}
            >
              <div className="space-y-0.5">
                {options.map((option) => {
                  const isActive = option.value === value;

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleSelect(option.value)}
                      data-dropdown-option
                      className={cn(
                        "group flex w-full items-center justify-between",
                        "gap-3 rounded-xl px-3 py-2.5",
                        "text-left text-sm font-medium",
                        "transition-all duration-150",
                        "cursor-pointer",
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <span className="truncate">{option.label}</span>

                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          "transition-all duration-150",
                          isActive
                            ? "bg-emerald-500 text-white"
                            : "bg-transparent text-transparent group-hover:bg-slate-100",
                        )}
                      >
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

