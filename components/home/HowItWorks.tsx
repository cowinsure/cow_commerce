"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/theme/theme.config";
import {
  Beef,
  Target,
  Users,
  CheckCircle2,
  Truck,
  Leaf,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Choose a Cow",
    description:
      "Browse available cows and check unit availability in real-time. View breed details, weight estimates, and farm origins.",
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg",
    icon: Beef,
    color: "emerald",
  },
  {
    title: "Book Your Share",
    description:
      "Select full or partial units based on your needs and budget. Secure your portion with a simple deposit.",
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg",
    icon: Target,
    color: "green",
  },
  {
    title: "Collective Booking",
    description:
      "Other buyers join until all units of the cow are fully reserved. Track progress in real-time as the community grows.",
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM (1).jpeg",
    icon: Users,
    color: "teal",
  },
  {
    title: "100% Completion",
    description:
      "Processing only begins once the cow is completely booked. No waste, no uncertainty, guaranteed full utilization.",
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.31 PM.jpeg",
    icon: CheckCircle2,
    color: "emerald",
  },
  {
    title: "Processing & Delivery",
    description:
      "Your portion is prepared fresh by certified butchers and delivered to your door or ready for farm pickup.",
    image: "/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg",
    icon: Truck,
    color: "green",
  },
];

const colorVariants = {
  emerald: {
    bg: "",
    border: "border-emerald-400/40",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    gradient: "from-emerald-500 to-teal-500",
  },
  green: {
    bg: "",
    border: "border-green-400/40",
    text: "text-green-400",
    glow: "shadow-green-500/20",
    gradient: "from-green-500 to-emerald-500",
  },
  teal: {
    bg: "",
    border: "border-teal-400/40",
    text: "text-teal-400",
    glow: "shadow-teal-500/20",
    gradient: "from-teal-500 to-emerald-500",
  },
};

export default function HowItWorks({ className }: { className?: string }) {
  return (
    <section
      id="how-it-works"
      className={cn(
        "relative bg-linear-to-b from-emerald-50 via-white to-emerald-50/50 py-24 px-6 sm:px-12 lg:px-24 overflow-hidden",
        className,
      )}
    >
      {/* Organic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top right blob */}
        <div className="absolute -top-40 -right-40 w-150 h-150 bg-emerald-200/40 rounded-full blur-[100px]" />
        {/* Bottom left blob */}
        <div className="absolute -bottom-40 -left-40 w-125 h-125 bg-green-200/30 rounded-full blur-[80px]" />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-teal-100/30 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 font-medium text-sm mb-6"
          >
            <Leaf className="w-4 h-4" />
            Simple Process
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 mb-6 tracking-tight">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
              Works
            </span>
          </h2>
          <p className="text-emerald-700/70 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
            From pasture to plate in five simple steps. Transparent, collective,
            and sustainable.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Animated */}
          <div className="hidden lg:block absolute top-31 left-[10%] right-[10%] h-0.75">
            <div className="absolute inset-0 bg-emerald-200 rounded-full" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-linear-to-r from-emerald-400 via-teal-400 to-green-400 rounded-full origin-left"
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors =
                colorVariants[step.color as keyof typeof colorVariants];

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative h-full bg-white rounded-3xl border border-emerald-100 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-emerald-950/60 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="pt-5 pb-4 px-4 text-left">
                      {/* Floating Icon Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className={cn(
                          "absolute top-36 left-8 -translate-x-1/2 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg",
                          colors.bg,
                          colors.border,
                          colors.glow,
                        )}
                      >
                        <Icon className={cn("w-7 h-7", colors.text)} />
                      </motion.div>

                      <h3 className="text-emerald-950 font-bold text-xl mb-3 group-hover:text-emerald-700 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-emerald-700/60 text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Step Number */}
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm border border-emerald-100">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  {/* Connector Dot for Desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="hidden lg:block absolute top-30 -right-2 w-4 h-4 rounded-full bg-white border-4 border-emerald-400 z-10 shadow-sm"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 rounded-full bg-white shadow-xl shadow-emerald-900/5 border border-emerald-100">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25">
              <CheckCircle2 className="w-5 h-5" />
              Processing only begins when 100% of units are booked
            </div>
            <button className="px-6 py-3 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors flex items-center gap-2 group">
              Browse Available Cows
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-emerald-700/50 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            No Waste Guarantee
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            Transparent Pricing
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            Community Driven
          </span>
        </motion.div>
      </div>
    </section>
  );
}
