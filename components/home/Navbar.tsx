"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";
import { Menu, X, User, LogOut, Sprout } from "lucide-react";
import { usePathname } from "next/navigation";
import { shouldShowNavLink } from "@/lib/config/protected-routes";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Order History", href: "/order-history" },
  { name: "About", href: "/about" },
];

export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const { isAuthenticated, loading, logout } = useAuth();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    // Optionally redirect to home or refresh
    window.location.href = "/";
  };

  const hideNavbar = pathname.startsWith("/auth");

  // Show loading skeleton while checking auth
  if (loading) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-emerald-50 backdrop-blur-xl shadow-lg shadow-emerald-900/5"
            : "bg-emerald-50 backdrop-blur-xl",
          className,
        )}
      >
        <div className="flex justify-between items-center w-full px-4 sm:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-10">
            {/* Logo Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-200 rounded-full animate-pulse" />
              <div className="w-40 h-6 bg-emerald-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Nav Links Skeleton */}
            <div className="hidden md:flex gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-16 h-4 bg-emerald-100 rounded animate-pulse"
                />
              ))}
            </div>
            {/* Button Skeleton */}
            <div className="w-24 h-10 bg-emerald-100 rounded-full animate-pulse" />
          </div>
        </div>
      </motion.nav>
    );
  }

  if (hideNavbar) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-emerald-50 backdrop-blur-xl shadow-lg shadow-emerald-900/5"
            : "bg-emerald-50 backdrop-blur-xl",
          className,
        )}
      >
        <div className="flex justify-between items-center w-full px-4 sm:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Sprout className="w-6 h-6 text-emerald-600" />
              </motion.div>
              <span className="text-xl font-bold tracking-tighter text-emerald-900">
                The Digital Agrarian
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center font-headline text-sm font-medium tracking-tight">
              {navLinks
                .filter((link) => shouldShowNavLink(link.href, isAuthenticated))
                .map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "pb-1 transition-all duration-200 hover:scale-105",
                      pathname === link.href
                        ? "text-emerald-900 border-b-2 border-emerald-900"
                        : "text-zinc-600 hover:text-emerald-800",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {/* Avatar Button */}
                <motion.button
                  className="flex items-center gap-2 px-2 py-2 rounded-full hover:bg-emerald-50 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white  rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 /30 overflow-hidden"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-700  hover:bg-emerald-50 transition-colors duration-200"
                      >
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600  hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth?login=true"
                  className="px-5 py-2 bg-emerald-700 text-white rounded-full font-semibold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 transition-all duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-50 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-emerald-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-emerald-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full bg-emerald-50 shadow-2xl"
            >
              <div className="flex flex-col h-full pt-26 pb-6 px-6">
                {/* Navigation Links */}
                <div className="flex-1 space-y-2">
                  {navLinks
                    .filter((link) =>
                      shouldShowNavLink(link.href, isAuthenticated),
                    )
                    .map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-200",
                            pathname === link.href
                              ? "bg-emerald-50 text-emerald-900 "
                              : "text-zinc-700 hover:bg-zinc-50 ",
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                </div>

                {/* Mobile Auth Section */}
                <div className="border-t border-zinc-200  pt-6 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-3 px-4 rounded-xl text-zinc-700  hover:bg-zinc-50 transition-all duration-200"
                        >
                          <User className="w-5 h-5" />
                          <span className="font-medium">Profile</span>
                        </Link>
                      </motion.div>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-red-600  hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          href="/auth?login=true"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 px-4 rounded-xl text-center font-semibold bg-emerald-600  text-white hover:bg-emerald-700 transition-all duration-200"
                        >
                          Login
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
