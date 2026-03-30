"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const leftPanelVariants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const rightPanelVariants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.7,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const textVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const badgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const glassElementVariants = {
  hidden: { x: 100, opacity: 0, rotate: 0 },
  visible: {
    x: 0,
    opacity: 0.2,
    rotate: 12,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <motion.main
      className="min-h-screen flex items-stretch overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side: Visual/Pastoral Side */}
      <motion.section
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/80"
        variants={leftPanelVariants}
      >
        <motion.div className="absolute inset-0" variants={imageVariants}>
          <Image
            alt="The Digital Agrarian Pastoral Landscape"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            fill
            priority
            sizes="50vw"
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80"
          />
        </motion.div>

        <div className="relative z-10 p-16 flex flex-col justify-between h-[90dvh] w-full">
          <motion.div variants={textVariants}>
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-primary">
              The Digital Agrarian
            </h1>
          </motion.div>

          <div className="max-w-md">
            <motion.div
              className="mb-8 h-1 w-12 bg-primary-fixed"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              style={{ originX: 0 }}
            />
            <motion.h2
              className="font-headline text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight"
              variants={textVariants}
            >
              Cultivating the future of livestock commerce.
            </motion.h2>
            <motion.p
              className="text-primary-fixed text-lg leading-relaxed font-medium"
              variants={textVariants}
            >
              Join an elite network of producers and buyers. Managing your farms
              digital footprint has never been this seamless.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center gap-8 text-white/60 font-medium text-sm"
            variants={containerVariants}
          >
            {[
              {
                icon: (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                ),
                text: "Verified Assets",
                fill: "currentColor",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
                text: "Secure Auctions",
                fill: "none",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                ),
                text: "Real-time Data",
                fill: "none",
              },
            ].map((item, index) => (
              <motion.span
                key={item.text}
                className="flex items-center gap-2"
                variants={badgeVariants}
                custom={index}
              >
                <svg
                  className="w-5 h-5 text-primary-fixed"
                  fill={item.fill}
                  viewBox="0 0 24 24"
                  stroke={item.fill === "none" ? "currentColor" : undefined}
                >
                  {item.icon}
                </svg>
                {item.text}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Asymmetric Glass Decorative Element */}
        <motion.div
          className="absolute -right-20 top-1/4 w-64 h-96 bg-white/20 backdrop-blur-xl rounded-full"
          variants={glassElementVariants}
        />
      </motion.section>

      {/* Right Side: Auth Form */}
      <motion.section
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white"
        variants={rightPanelVariants}
      >
        <motion.div
          className={cn("w-full max-w-110", className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {children}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
