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
} from "lucide-react";
import Link from "next/link";
import { useLocalization } from "@/context/LocalizationContext";

// Slides focused on the collective booking model
const slides = [
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg", // Live cattle (heritage breed)
    tagKey: "home_hero.slides.0.tag",
    titleKey: "home_hero.slides.0.title",
    subtitleKey: "home_hero.slides.0.subtitle",
    descriptionKey: "home_hero.slides.0.description",
    priceKey: "home_hero.slides.0.price",
    progress: 75, // Percentage booked
    unitsAvailableKey: "home_hero.slides.0.unitsAvailable",
    icon: Users,
    ctaKey: "home_hero.slides.0.cta",
    secondaryCtaKey: "home_hero.slides.0.secondaryCta",
    badgeKey: "home_hero.slides.0.badge",
    deadlineKey: "home_hero.slides.0.deadline",
  },
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg", // Cattle in pasture
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
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.31 PM.jpeg", // Butcher/processing
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
  { icon: ShieldCheck, labelKey: "home_hero.trust.0.label" },
  { icon: Clock, labelKey: "home_hero.trust.1.label" },
  { icon: Beef, labelKey: "home_hero.trust.2.label" },
];

export function HomeHero({ className }: { className?: string }) {
  const { t } = useLocalization();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    const timer = setInterval(slideNext, 9000); // Longer for reading progress details
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const CurrentIcon = slides[current].icon;
  const currentSlide = slides[current];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-stone-950",
        className,
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background with Ken Burns */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 },
          }}
          className="absolute inset-0 bg-emerald-50"
        >
          {/* <Image
            alt={t(currentSlide.titleKey)}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={currentSlide.image}
          /> */}

          {/* Warm, earthy gradients (farm feel) */}
          {/* <div className="absolute inset-0 bg-linear-to-r from-stone-950/95 via-stone-950/70 to-stone-950/40" /> */}
          <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-emerald-950 to-emerald-400" />
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(28,25,23,0.6)_120%)]" /> */}

          {/* Organic grain texture */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-[90vh] px-6 sm:px-12 lg:px-24 pt-20">
        <div className="max-w-screen-2xl w-full mx-auto grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tag + Badge Row */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 mb-6 flex-wrap"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="p-2.5 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30"
                  >
                    <CurrentIcon className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                  <span className="text-emerald-400 font-semibold uppercase">
                    {t(currentSlide.tagKey)}
                  </span>
                  {/* {currentSlide.badgeKey && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold border hidden md:block",
                        currentSlide.progress === 100
                          ? "bg-stone-700/50 text-stone-400 border-stone-600/30"
                          : currentSlide.progress > 70
                            ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                      )}
                    >
                      {t(currentSlide.badgeKey)}
                    </motion.span>
                  )} */}
                </motion.div>

                {/* Title Animation */}
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 leading-[0.9]">
                  <motion.span
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block text-white"
                    style={{ transformOrigin: "bottom" }}
                  >
                    {t(currentSlide.titleKey)}
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.35,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block text-emerald-400"
                    style={{ transformOrigin: "bottom" }}
                  >
                    {t(currentSlide.subtitleKey)}
                  </motion.span>
                </h1>

                {/* Price Tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 py-  backdrop-blur-sm  text-emerald-300 font-bold text-lg">
                    {t(currentSlide.priceKey)}
                  </span>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-stone-300 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed font-medium"
                >
                  {t(currentSlide.descriptionKey)}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-wrap gap-4 mb-10"
                >
                  <Link href="/marketplace">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-emerald-500 text-stone-950 rounded-full font-bold text- overflow-hidden transition-all hover:shadow-2xl hover:shadow-emerald-500/30 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {t(currentSlide.ctaKey)}
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </Link>

                  {/* <motion.button
                    onClick={() => {
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent border-2 border-stone-400/50 text-stone-200 rounded-full font-bold text-lg hover:bg-stone-400/10 hover:border-stone-300 transition-all backdrop-blur-sm"
                  >
                    {t(currentSlide.secondaryCtaKey)}
                  </motion.button> */}
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="flex flex-wrap gap-6 items-center"
                >
                  {trustSignals.map((signal, idx) => (
                    <motion.div
                      key={t(signal.labelKey)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + idx * 0.1 }}
                      className="flex items-center gap-2 text-stone-400"
                    >
                      <signal.icon className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">
                        {t(signal.labelKey)}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Funding Progress Card (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 hidden lg:block"
          >
            <div className="relative rounded-3xl bg-linear-to-t from-emerald-900 to-emerald-400 backdrop-blur-xl border border-stone-700/50 shadow-2xl overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/80 rounded-full blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src="/banner1removebg.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between">
          {/* Progress Bars */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative h-1.5 rounded-full overflow-hidden bg-stone-800/50 transition-all hover:bg-stone-700/50"
                style={{ width: index === current ? "80px" : "40px" }}
              >
                {index === current && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-500 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 9, ease: "linear" }}
                    key={current}
                  />
                )}
                {index < current && (
                  <div className="absolute inset-0 bg-emerald-500/50" />
                )}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/20 transition-colors" />
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={slidePrev}
              className="p-4 rounded-full bg-stone-900/30 backdrop-blur-md border border-stone-400/20 text-stone-300 hover:bg-stone-800/50 hover:border-emerald-400/40 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={slideNext}
              className="p-4 rounded-full bg-stone-900/30 backdrop-blur-md border border-stone-400/20 text-stone-300 hover:bg-stone-800/50 hover:border-emerald-400/40 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Counter */}
        <div className="hidden lg:block absolute bottom-0 right-0 text-stone-500 font-mono text-sm tracking-wider">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 font-bold text-2xl"
          >
            0{current + 1}
          </motion.span>
          <span className="mx-2">/</span>
          <span>0{slides.length}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-stone-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-emerald-500 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
