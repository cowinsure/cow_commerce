"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const slides = [
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg",
    tag: "Curated Listings",
    title: "Prime Cattle Selection",
    description:
      "Experience the next generation of livestock procurement. Precision-bred assets for the discerning digital producer.",
  },
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg",
    tag: "Premium Stock",
    title: "Angus Excellence",
    description:
      "Discover award-winning bloodlines with full genetic documentation and verified health records.",
  },
  {
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.31 PM.jpeg",
    tag: "Verified Quality",
    title: "Heritage Breeds",
    description:
      "Rare and heritage breed cattle raised on sustainable pastures with complete traceability.",
  },
];

export function HeroSection({ className }: { className?: string }) {
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

  // Auto-play with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slideNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") slidePrev();
      if (e.key === "ArrowRight") slideNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideNext, slidePrev]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <header
      className={cn(
        "relative px-4 sm:px-8 max-w-screen-2xl mx-auto mb-16",
        className,
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-[500px] sm:h-[600px] w-full rounded-2xl overflow-hidden bg-primary-container">
        {/* Background Images with Ken Burns Effect */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              alt={slides[current].title}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={slides[current].image}
            />
            {/* Animated gradient overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-primary-container/95 via-primary-container/70 to-transparent"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-8 sm:px-16">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Tag */}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 text-primary-fixed font-semibold tracking-widest text-xs uppercase mb-6"
                >
                  <span className="w-8 h-[2px] bg-primary-fixed" />
                  {slides[current].tag}
                </motion.span>

                {/* Title with split animation */}
                <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9]">
                  {slides[current].title.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2 + i * 0.1,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-on-primary-container/90 text-lg sm:text-xl max-w-lg mb-10 font-medium leading-relaxed"
                >
                  {slides[current].description}
                </motion.p>

                {/* Buttons */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <button className="group relative px-8 py-4 bg-primary-fixed text-on-primary-fixed rounded-full font-bold overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary-fixed/30 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">
                      Browse Inventory
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>

                  <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-full font-bold hover:bg-white/20 hover:border-white/50 transition-all active:scale-95">
                    View Trends
                  </button>
                </motion.div> */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
          {/* Progress indicators */}
          <div className="flex gap-2 mr-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative h-1 w-12 rounded-full overflow-hidden bg-white/20 transition-all hover:bg-white/40"
              >
                {index === current && (
                  <motion.div
                    className="absolute inset-0 bg-primary-fixed origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 6,
                      ease: "linear",
                    }}
                    key={current}
                  />
                )}
                {index < current && (
                  <div className="absolute inset-0 bg-primary-fixed" />
                )}
              </button>
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={slidePrev}
              className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideNext}
              className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 left-8 z-20 text-white/60 font-mono text-sm">
          <span className="text-white font-bold text-lg">0{current + 1}</span>
          <span className="mx-2">/</span>
          <span>0{slides.length}</span>
        </div>
      </div>
    </header>
  );
}
