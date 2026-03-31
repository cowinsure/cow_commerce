"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import {
  Shield,
  Heart,
  Award,
  Leaf,
  CheckCircle,
  Truck,
  FileCheck,
  Activity,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Microscope,
  Clock,
  ChevronRight,
} from "lucide-react";
import SectionMiniHeading from "../ui/SectionMiniHeading";

const qualityMetrics = [
  {
    icon: Shield,
    title: "DNA Verified",
    description: "Comprehensive genetic testing verifies lineage and purity",
    stat: "100%",
    statLabel: "Verified",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Heart,
    title: "Health Certified",
    description: "24/7 veterinary monitoring with real-time health tracking",
    stat: "24/7",
    statLabel: "Monitoring",
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Award,
    title: "Grade Certified",
    description: "Official USDA grading and third-party quality assessment",
    stat: "A+",
    statLabel: "Grade",
    color: "tertiary",
    gradient: "from-tertiary/20 to-tertiary/5",
  },
  {
    icon: Leaf,
    title: "Sustainably Raised",
    description: "Regenerative farming practices with carbon-neutral goals",
    stat: "Zero",
    statLabel: "Carbon",
    color: "success",
    gradient: "from-success/20 to-success/5",
  },
];

const healthChecklist = [
  { text: "Comprehensive veterinary examination", icon: Microscope },
  { text: "Vaccination records up to date", icon: Shield },
  { text: "Genetic disease screening completed", icon: Activity },
  { text: "Nutritional history documented", icon: FileCheck },
  { text: "Growth rate monitoring data", icon: TrendingUp },
  { text: "Temperament evaluation passed", icon: Heart },
  { text: "Reproductive health certified", icon: Sparkles },
  { text: "Transit readiness verified", icon: Truck },
];

const certifications = [
  {
    name: "USDA Organic",
    logo: "🌿",
    description: "Certified organic feed and practices",
    color: "text-green-600",
  },
  {
    name: "Animal Welfare Approved",
    logo: "🐄",
    description: "Highest welfare standards met",
    color: "text-blue-600",
  },
  {
    name: "Global G.A.P.",
    logo: "🌍",
    description: "Internationally recognized safety",
    color: "text-indigo-600",
  },
  {
    name: "Humane Certified",
    logo: "❤️",
    description: "Humane handling guaranteed",
    color: "text-rose-600",
  },
];

const trustBadges = [
  { icon: Truck, label: "Safe Transport", color: "text-primary" },
  { icon: Shield, label: "Buyer Protection", color: "text-success" },
  { icon: Heart, label: "Welfare First", color: "text-secondary" },
  { icon: Clock, label: "24h Response", color: "text-tertiary" },
];

interface QualityHealthSectionProps {
  className?: string;
}

export function QualityHealthSection({ className }: QualityHealthSectionProps) {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [activeCert, setActiveCert] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      className={cn("relative py-32 px-4 sm:px-8 overflow-hidden", className)}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-surface-container-low via-surface-container to-surface-container-low"
        style={{ y: backgroundY }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <SectionMiniHeading heading="Quality Assurance" />

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            <span className="block">Perfectly Healthy.</span>
            <span className="block bg-linear-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              Premium Quality.
            </span>
          </h2>

          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto leading-relaxed">
            Every animal undergoes rigorous multi-point inspection protocols,
            ensuring only the finest livestock enter our marketplace.
          </p>
        </motion.div>

        {/* Premium Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {qualityMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredMetric(index)}
              onMouseLeave={() => setHoveredMetric(null)}
              className="group relative"
            >
              <div
                className={cn(
                  "relative bg-surface-container rounded-3xl p-8 border border-outline-variant/10 overflow-hidden transition-all duration-500",
                  hoveredMetric === index
                    ? "shadow-2xl shadow-primary/10 scale-[1.02]"
                    : "hover:shadow-xl",
                )}
              >
                {/* Background Gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    metric.gradient,
                  )}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    animate={
                      hoveredMetric === index
                        ? { rotate: [0, -10, 10, 0], scale: 1.1 }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300",
                      metric.color === "primary" &&
                        "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary",
                      metric.color === "secondary" &&
                        "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary",
                      metric.color === "tertiary" &&
                        "bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
                      metric.color === "success" &&
                        "bg-success/10 text-success group-hover:bg-success group-hover:text-on-success",
                    )}
                  >
                    <metric.icon className="w-8 h-8" />
                  </motion.div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black tracking-tight">
                      {metric.stat}
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant">
                      {metric.statLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {metric.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredMetric === index ? "100%" : "0%" }}
                    className={cn(
                      "h-1 mt-6 rounded-full",
                      metric.color === "primary" && "bg-primary",
                      metric.color === "secondary" && "bg-secondary",
                      metric.color === "tertiary" && "bg-tertiary",
                      metric.color === "success" && "bg-success",
                    )}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Health Checklist - Takes 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-surface-container rounded-3xl p-8 lg:p-10 border border-outline-variant/10 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">8-Point Health Audit</h3>
                    <p className="text-sm text-on-surface-variant">
                      Comprehensive verification protocol
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs font-bold text-success">
                    All Passed
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {healthChecklist.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0 group-hover:bg-success/20"
                    >
                      <item.icon className="w-5 h-5 text-success" />
                    </motion.div>
                    <span className="text-sm font-medium leading-tight group-hover:text-on-surface">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-5 bg-primary text-on-primary rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
              >
                <FileCheck className="w-5 h-5" />
                View Complete Health Documentation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Certifications - Takes 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-surface-container rounded-3xl p-8 lg:p-10 border border-outline-variant/10 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Award className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Certified Excellence</h3>
                  <p className="text-sm text-on-surface-variant">
                    Industry-leading standards
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveCert(index)}
                    onMouseLeave={() => setActiveCert(null)}
                    className="group relative overflow-hidden rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 p-5">
                      <motion.div
                        animate={
                          activeCert === index
                            ? { scale: 1.2, rotate: [0, -10, 10, 0] }
                            : {}
                        }
                        className="text-4xl"
                      >
                        {cert.logo}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className={cn("font-bold mb-1", cert.color)}>
                          {cert.name}
                        </h4>
                        <AnimatePresence>
                          {activeCert === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-on-surface-variant"
                            >
                              {cert.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 transition-all",
                          activeCert === index
                            ? "translate-x-1 opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-outline-variant/10">
                <div className="flex flex-wrap gap-3">
                  {trustBadges.map((badge, index) => (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low rounded-full border border-outline-variant/10 hover:border-primary/30 transition-all"
                    >
                      <badge.icon className={cn("w-4 h-4", badge.color)} />
                      <span className="text-xs font-bold">{badge.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-10 rounded-3xl bg-linear-to-br from-secondary-container/50 to-tertiary-container/30 border border-outline-variant/10">
            <p className="text-on-surface-variant text-lg max-w-xl">
              Every purchase includes comprehensive health guarantees, full
              genetic documentation, and lifetime support from our veterinary
              team.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-secondary text-on-secondary rounded-full font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl hover:shadow-secondary/30 transition-all flex items-center gap-3"
            >
              Explore Our Quality Standards
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
