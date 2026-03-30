"use client";

import { useState } from "react";
import { cn } from "@/lib/theme/theme.config";
import Link from "next/link";
import { authService } from "@/lib/api/auth";

const navLinks = [
  { name: "Marketplace", href: "#", active: true },
  { name: "Auctions", href: "#", active: false },
  { name: "Order History", href: "#", active: false },
  { name: "About", href: "#", active: false },
];

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = authService.isAuthenticated();

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Logo and Links */}
        <div className="flex items-center gap-12">
          <span className="text-xl font-bold tracking-tighter text-emerald-900 dark:text-emerald-100">
            The Digital Agrarian
          </span>
          <div className="hidden md:flex gap-8 items-center font-headline text-sm font-medium tracking-tight">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "pb-1 transition-colors",
                  link.active
                    ? "text-emerald-900 dark:text-emerald-400 border-b-2 border-emerald-900 dark:border-emerald-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-800 dark:hover:text-emerald-300",
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href={"/auth"}
              className="px-5 py-2 text-sm font-semibold text-emerald-900 dark:text-emerald-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
            >
              Logout
            </Link>
            {/* <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all">
            Sign Up
          </button> */}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href={"/auth"}
              className="px-5 py-2 text-sm font-semibold text-emerald-900 dark:text-emerald-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
            >
              Login
            </Link>
            {/* <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all">
            Sign Up
          </button> */}
          </div>
        )}
      </div>
      {/* <div className="bg-zinc-100/50 dark:bg-zinc-800/50 h-[1px] w-full" /> */}
    </nav>
  );
}
