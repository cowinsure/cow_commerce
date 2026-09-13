"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  House,
  ShoppingBag,
  Clock3,
  Sparkles,
  ScrollText,
  Building2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { shouldShowNavLink } from "@/lib/config/protected-routes";
import ToggleLan from "@/components/ui/ToggleLan";
import { useLocalization } from "@/context/LocalizationContext";
import UseLogo from "../ui/UseLogo";
import { usePersonalInfo } from "@/hooks/personalInfo/usePersonalInfo";

// =========================================================
// TOOLTIP COMPONENT
// =========================================================
function NavTooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 6, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-950/95 px-3 py-1.5 text-xs font-semibold text-emerald-100 shadow-xl shadow-black/40 border border-emerald-800/30 backdrop-blur-xl"
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =========================================================
// NAV LINK DATA
// =========================================================
const navLinks = [
  {
    key: "navbar.home",
    href: "/",
    icon: House,
  },
  {
    key: "navbar.marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
  },
  {
    key: "navbar.order_history",
    href: "/order-history",
    icon: Clock3,
  },
  {
    key: "navbar.about",
    href: "/about-us",
    icon: Building2,
  },
  {
    key: "navbar.our_terms",
    href: "/terms",
    icon: ScrollText,
  },
];

// =========================================================
// MAGNETIC BUTTON HOOK
// =========================================================
function useMagnetic(strength = 0.3) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return { position, handleMouseMove, handleMouseLeave, ref };
}

// =========================================================
// NAVBAR COMPONENT
// =========================================================
export function Navbar({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { t, locale } = useLocalization();
  const { scrollY } = useScroll();

  const { isAuthenticated, loading, logout } = useAuth();
  const { fetchPersonalInfo } = usePersonalInfo();

  // Create magnetic hooks for each nav link at the top level
  const magneticHome = useMagnetic(0.2);
  const magneticMarketplace = useMagnetic(0.2);
  const magneticOrderHistory = useMagnetic(0.2);
  const magneticAbout = useMagnetic(0.2);
  const magneticTerms = useMagnetic(0.2);

  // =========================================================
  // SCROLL STATE
  // =========================================================
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // =========================================================
  // BODY LOCK (MOBILE MENU)
  // =========================================================
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // =========================================================
  // USER DATA
  // =========================================================
  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const response = await fetchPersonalInfo();
        if (response?.data) {
          const data = response.data as {
            first_name?: string;
            last_name?: string;
            profile_image_url?: string;
            thana?: string;
            union?: string;
            village?: string;
            zilla?: string;
            date_of_birth?: string;
            gender?: string;
            tin?: string;
          };
          const name =
            `${data.first_name || ""} ${data.last_name || ""}`.trim();
          setUserName(name || t("profile.defaultUserName"));
        }
      } catch (error) {
        // If no personal info exists yet, use default
        setUserName(t("profile.defaultUserName"));
      }
    };

    loadPersonalInfo();
  }, [fetchPersonalInfo, t]);

  // =========================================================
  // LOGOUT HANDLER
  // =========================================================
  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  const hideNavbar = pathname.startsWith("/auth");
  const isHome = pathname === "/";

  // =========================================================
  // LOADING SKELETON
  // =========================================================
  if (loading) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 bg-emerald-950/80 backdrop-blur-2xl"
      >
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-800/50 rounded-lg animate-pulse" />
            <div className="w-32 h-5 bg-emerald-800/30 rounded-full animate-pulse" />
          </div>
          <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-4 bg-emerald-800/30 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </motion.nav>
    );
  }

  if (hideNavbar) return null;

  // =========================================================
  // NAVBAR SHELL
  // =========================================================
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isHome
            ? scrolled
              ? "bg-emerald-950/90 backdrop-blur-2xl shadow-2xl shadow-black/20 border-b border-emerald-800/20"
              : "bg-transparent"
            : "bg-emerald-950/90 backdrop-blur-2xl shadow-2xl shadow-black/20 border-b border-emerald-800/20",
          className,
        )}
        lang={locale === "bn" ? "bn" : "en"}
      >
        {/* Decorative top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        </div>

        <div className="flex justify-between items-center px-3 w-full py-3 max-w-screen-2xl mx-auto md:grid md:grid-cols-3">
          {/* =====================================================
               LEFT — LOGO
           ====================================================== */}
          <div className="flex items-center">
            <motion.div
              className="flex items-center gap-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <UseLogo imgWidth="w-9" />
              </div>
            </motion.div>
          </div>

          {/* =====================================================
               CENTER — DESKTOP NAVIGATION
           ====================================================== */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center gap-10">
              {navLinks
                .filter((link) => shouldShowNavLink(link.href, isAuthenticated))
                .map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <motion.div
                      key={link.key}
                      className="relative"
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300",
                          isActive
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-zinc-300 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-emerald-400/10"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                        <Icon className="h-5 w-5 relative z-10" />
                      </Link>

                      <NavTooltip
                        label={t(link.key)}
                        visible={hoveredLink === link.href && !isActive}
                      />
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* =====================================================
               RIGHT — DESKTOP ACTIONS
           ====================================================== */}
          <div className="hidden md:flex items-center gap-3 justify-end">
            <ToggleLan />

            <div className="w-px h-6 bg-emerald-800/30 mx-1" />

            {isAuthenticated ? (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <motion.button
                  className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/5 border border-emerald-800/20 hover:bg-emerald-900/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">
                    {userName}
                  </span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-zinc-400 -rotate-90" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.95,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        scale: 0.95,
                        filter: "blur(4px)",
                      }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 mt-3 w-56 py-2 bg-emerald-950/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/40 border border-emerald-800/30 overflow-hidden"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-zinc-200 font-medium hover:text-emerald-400 hover:bg-emerald-900/30 transition-all duration-200 group"
                      >
                        <User className="w-4 h-4 text-zinc-200 group-hover:text-emerald-400 transition-colors" />
                        <span>{t("navbar.profile")}</span>
                      </Link>

                      <div className="border-t border-emerald-800/20 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-400 hover:bg-red-950 transition-all duration-200 group cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-400 transition-colors" />
                          <span>{t("navbar.logout")}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth?login=true"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t("navbar.login")}</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* =====================================================
               MOBILE MENU TOGGLE
           ====================================================== */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-emerald-800/20 backdrop-blur-sm"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <X className="w-5 h-5 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Menu className="w-5 h-5 text-zinc-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* =========================================================
          MOBILE MENU — FULL SCREEN IMMERSIVE
      ========================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-[#071815] via-emerald-950/95 to-emerald-950/90 backdrop-blur-3xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Decorative radial glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-green-600/5 blur-3xl" />
            </div>

            {/* Grain texture overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage: `
                  url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
                `,
              }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="relative h-[90dvh] flex flex-col pt-24 pb-8 px-6 overflow-auto"
            >
              {/* Language Toggle */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-end mb-8"
              >
                <ToggleLan />
              </motion.div>

              {/* Navigation Links */}
              <div className="flex-auto space-y-1">
                {navLinks
                  .filter((link) =>
                    shouldShowNavLink(link.href, isAuthenticated),
                  )
                  .map((link, index) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                      <motion.div
                        key={link.key}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.15 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "group flex items-center justify-between py-3 px-4 rounded-2xl transition-all duration-300",
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "text-zinc-400 hover:text-white hover:bg-white/5",
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <Icon className="h-5 w-5" />
                            <span className="text-lg font-medium tracking-tight">
                              {t(link.key)}
                            </span>
                          </div>
                          <motion.div
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.1, x: 4 }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>

              {/* Mobile Auth Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-emerald-800/20 pt-4 space-y-2"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 py-4 px-4 rounded-2xl text-zinc-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-lg font-medium">
                        {t("navbar.profile")}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 py-4 px-4 rounded-2xl text-red-400/80 hover:bg-red-950/20 hover:text-red-400 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <LogOut className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-medium">
                        {t("navbar.logout")}
                      </span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth?login=true"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold bg-emerald-500 text-emerald-950 hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="text-lg">{t("navbar.login")}</span>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
