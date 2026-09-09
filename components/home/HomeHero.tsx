/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Target,
  Clock,
  ShieldCheck,
  Beef,
  CheckCircle2,
  CalendarDays,
  Tag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useLocalization } from "@/context/LocalizationContext";

const slides = [
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg",
    tagKey: "home_hero.slides.0.tag",
    titleKey: "home_hero.slides.0.title",
    subtitleKey: "home_hero.slides.0.subtitle",
    descriptionKey: "home_hero.slides.0.description",
    priceKey: "home_hero.slides.0.price",
    progress: 75,
    unitsAvailableKey: "home_hero.slides.0.unitsAvailable",
    icon: Users,
    ctaKey: "home_hero.slides.0.cta",
    secondaryCtaKey: "home_hero.slides.0.secondaryCta",
    badgeKey: "home_hero.slides.0.badge",
    deadlineKey: "home_hero.slides.0.deadline",
  },
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg",
    tagKey: "home_hero.slides.1.tag",
    titleKey: "home_hero.slides.1.title",
    subtitleKey: "home_hero.slides.1.subtitle",
    descriptionKey: "home_hero.slides.1.description",
    priceKey: "home_hero.slides.1.price",
    progress: 45,
    unitsAvailableKey: "home_hero.slides.1.unitsAvailable",
    icon: Target,
    ctaKey: "home_hero.slides.1.cta",
    secondaryCtaKey: "home_hero.slides.1.secondaryCta",
    badgeKey: "home_hero.slides.1.badge",
    deadlineKey: "home_hero.slides.1.deadline",
  },
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.31 PM.jpeg",
    tagKey: "home_hero.slides.2.tag",
    titleKey: "home_hero.slides.2.title",
    subtitleKey: "home_hero.slides.2.subtitle",
    descriptionKey: "home_hero.slides.2.description",
    priceKey: "home_hero.slides.2.price",
    progress: 100,
    unitsAvailableKey: "home_hero.slides.2.unitsAvailable",
    icon: CheckCircle2,
    ctaKey: "home_hero.slides.2.cta",
    secondaryCtaKey: "home_hero.slides.2.secondaryCta",
    badgeKey: "home_hero.slides.2.badge",
    deadlineKey: "home_hero.slides.2.deadline",
  },
];

const trustSignals = [
  {
    icon: ShieldCheck,
    labelKey: "home_hero.trust.0.label",
  },
  {
    icon: Clock,
    labelKey: "home_hero.trust.1.label",
  },
  {
    icon: Beef,
    labelKey: "home_hero.trust.2.label",
  },
];

export function HomeHero({ className }: { className?: string }) {
  const { t } = useLocalization();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentSlide = slides[current];
  const CurrentIcon = currentSlide.icon;

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(slideNext, 9000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slideNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") slidePrev();
      if (e.key === "ArrowRight") slideNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideNext, slidePrev]);

  return (
    <section
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#071815] text-white",
        className,
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* =========================================================
          BACKGROUND SYSTEM
      ========================================================== */}

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`background-${current}`}
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          {/* Actual cattle photograph */}
          <img
            src={currentSlide.image}
            alt=""
            aria-hidden="true"
            className="absolute right-[-8%] top-[12%] h-[72%] w-[58%] object-cover opacity-[0.16] blur-[1px]"
          />

          {/* Image color treatment */}
          <div className="absolute inset-0 bg-[#071815]/70" />

          {/* Large green radial glow */}
          <div className="absolute left-[38%] top-[20%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />

          {/* Bottom photographic wash */}
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#071815] via-[#071815]/80 to-transparent" />

          {/* Left darkening */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071815] via-[#071815]/85 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* =========================================================
          ART DIRECTION / GIANT TYPE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            x: current % 2 === 0 ? 0 : -35,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -right-[4vw] top-[5vh] select-none text-[20vw] font-black leading-none tracking-[-0.08em] text-white/[0.025]"
        >
          CATTLE
        </motion.div>

        <div className="absolute left-0 top-[22%] h-px w-[38vw] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

        <div className="absolute bottom-[22%] right-0 h-px w-[45vw] bg-gradient-to-l from-transparent via-emerald-400/15 to-transparent" />

        {/* Fine vertical editorial lines */}
        <div className="absolute left-[7%] top-0 h-full w-px bg-white/[0.035]" />
        <div className="absolute left-[52%] top-0 h-full w-px bg-white/[0.025]" />
        <div className="absolute right-[7%] top-0 h-full w-px bg-white/[0.035]" />
      </div>

      {/* =========================================================
          GRAIN
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
          `,
        }}
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1700px] items-center px-6 pb-28 pt-28 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] xl:gap-20">
          {/* =====================================================
              LEFT — EDITORIAL COPY
          ====================================================== */}

          <div className="relative z-20 max-w-[700px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction * 45,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction * -45,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-7 flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <CurrentIcon className="h-4 w-4 text-emerald-400" />
                  </div>

                  <div className="h-px w-8 bg-emerald-400/40" />

                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                    {t(currentSlide.tagKey)}
                  </span>
                </motion.div>

                {/* Main heading */}
                <h1 className="mb-7 max-w-[760px] text-[clamp(3.7rem,7vw,7.4rem)] font-black leading-[0.82] tracking-[-0.065em]">
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 50,
                      rotateX: -35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                    }}
                    transition={{
                      delay: 0.15,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block"
                  >
                    {t(currentSlide.titleKey)}
                  </motion.span>

                  <motion.span
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.25,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative mt-2 block text-emerald-400"
                  >
                    {t(currentSlide.subtitleKey)}

                    {/* Decorative line */}
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "22%" }}
                      transition={{
                        delay: 0.8,
                        duration: 0.7,
                      }}
                      className="absolute bottom-[-10px] left-0 h-[3px] rounded-full bg-emerald-400"
                    />
                  </motion.span>
                </h1>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="mb-5 flex items-center gap-3"
                >
                  <span className="text-lg font-bold text-emerald-300">
                    {t(currentSlide.priceKey)}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-white/30" />

                  <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Live marketplace
                  </span>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.65 }}
                  className="mb-9 max-w-xl text-base font-medium leading-7 text-white/60 sm:text-lg"
                >
                  {t(currentSlide.descriptionKey)}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mb-10"
                >
                  <Link href="/marketplace">
                    <motion.button
                      whileHover={{
                        scale: 1.035,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-full bg-emerald-400 px-7 py-4 font-bold text-[#071815] shadow-[0_20px_60px_rgba(52,211,153,0.15)]"
                    >
                      <span className="relative z-10">
                        {t(currentSlide.ctaKey)}
                      </span>

                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#071815] text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                        <ArrowRight className="h-4 w-4" />
                      </span>

                      <motion.span
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Trust */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-x-7 gap-y-3"
                >
                  {trustSignals.map((signal, index) => (
                    <motion.div
                      key={signal.labelKey}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.95 + index * 0.08,
                      }}
                      className="flex items-center gap-2 text-white/45"
                    >
                      <signal.icon className="h-4 w-4 text-emerald-400" />

                      <span className="text-xs font-medium">
                        {t(signal.labelKey)}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =====================================================
              RIGHT — VISUAL COMPOSITION
          ====================================================== */}

          <div className="relative hidden min-h-[650px] lg:block">
            {/* Large image frame */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                x: 80,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-[4%] top-[4%] h-[590px] w-[68%]"
            >
              {/* Cattle photograph behind */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cow-${current}`}
                  initial={{
                    opacity: 0,
                    scale: 1.12,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.04,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="absolute inset-0 overflow-hidden rounded-[2.5rem]"
                >
                  <img
                    src={currentSlide.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071815] via-[#071815]/20 to-transparent" />
                  <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
                </motion.div>
              </AnimatePresence>

              {/* Border */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/10" />

              {/* Corner detail */}
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-emerald-300/20 bg-[#0a201b]/80 backdrop-blur-md">
                <div className="flex h-full items-center justify-center">
                  <Beef className="h-5 w-5 text-emerald-300" />
                </div>
              </div>
            </motion.div>

            {/* =================================================
                FOREGROUND ILLUSTRATION
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.45,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-[2%] left-[4%] z-20 w-[72%]"
            >
              <motion.img
                src="/banner1removebg.png"
                alt="Livestock marketplace"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.35)]"
              />
            </motion.div>

            {/* =================================================
                AVAILABILITY CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
                y: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.8,
              }}
              className="absolute right-[-2%] top-[19%] z-30 w-[205px]"
            >
              <div className="rounded-[1.4rem] border border-white/10 bg-[#102720]/90 p-4 shadow-2xl backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    Availability
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
                </div>

                <div className="mb-3 flex items-end gap-1">
                  <motion.span
                    key={currentSlide.progress}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black"
                  >
                    {currentSlide.progress}
                  </motion.span>

                  <span className="mb-1 text-sm text-white/40">%</span>
                </div>

                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    key={`progress-${current}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${currentSlide.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full bg-emerald-400"
                  />
                </div>

                <p className="text-[11px] leading-4 text-white/45">
                  {t(currentSlide.unitsAvailableKey)}
                </p>
              </div>
            </motion.div>

            {/* =================================================
                DATE / RESERVATION CHIP
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: -25,
                rotate: -3,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
              }}
              transition={{
                delay: 1.05,
                duration: 0.7,
              }}
              className="absolute left-[1%] top-[9%] z-30"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-[#071815]">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/35">
                    Reservation
                  </p>

                  <p className="text-xs font-bold text-white">
                    Live cattle booking
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                TAG FLOATING ELEMENT
            ================================================= */}

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[18%] right-[0%] z-40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-[#0d241e]/90 shadow-xl backdrop-blur-xl">
                <Tag className="h-5 w-5 text-emerald-300" />
              </div>
            </motion.div>

            {/* Small decorative spark */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1],
              }}
              transition={{
                rotate: {
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute bottom-[10%] left-[15%] z-30 text-emerald-300/50"
            >
              <Sparkles className="h-7 w-7" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM CONTROL SYSTEM
      ========================================================== */}

      <div className="absolute bottom-7 left-0 right-0 z-40 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto flex max-w-[1700px] items-end justify-between">
          {/* Slide numbers */}
          <div className="flex items-center gap-5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group flex cursor-pointer items-center gap-3"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] transition-colors",
                    index === current
                      ? "text-emerald-300"
                      : "text-white/25",
                  )}
                >
                  0{index + 1}
                </span>

                <div
                  className={cn(
                    "relative h-px overflow-hidden transition-all duration-500",
                    index === current
                      ? "w-20 bg-white/10"
                      : "w-7 bg-white/10",
                  )}
                >
                  {index === current && (
                    <motion.div
                      key={`timer-${current}`}
                      initial={{ width: 0 }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 9,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 left-0 bg-emerald-400"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="mr-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
              Explore
            </span>

            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(52,211,153,0.12)",
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={slidePrev}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 backdrop-blur-md transition-colors hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(52,211,153,0.12)",
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={slideNext}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 backdrop-blur-md transition-colors hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
        }}
        className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex items-center gap-3 text-white/25">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em]">
            Scroll
          </span>

          <div className="h-px w-12 overflow-hidden bg-white/10">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full bg-emerald-400"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}