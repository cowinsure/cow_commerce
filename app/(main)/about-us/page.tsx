"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useLocalization } from "@/context/LocalizationContext";
import {
  Target,
  Heart,
  Shield,
  Leaf,
  Award,
  Users,
  Truck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  BarChart3,
  LeafyGreen,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Section animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function AboutUsPage() {
  const { t, locale } = useLocalization();

  const stats = [
    { value: "500+", label: t("about.stats.happyCustomers"), icon: Users },
    { value: "50K+", label: t("about.stats.cowsSold"), icon: BarChart3 },
    { value: "15+", label: t("about.stats.breedVarieties"), icon: Target },
    { value: "98%", label: t("about.stats.satisfactionRate"), icon: Heart },
  ];

  const features = [
    {
      key: "verifiedQuality",
      icon: Shield,
      color: "emerald",
    },
    {
      key: "doorstepDelivery",
      icon: Truck,
      color: "blue",
    },
    {
      key: "sustainable",
      icon: Leaf,
      color: "green",
    },
    {
      key: "premium",
      icon: Award,
      color: "amber",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: t("about.process.step1.title"),
      description: t("about.process.step1.description"),
    },
    {
      number: "02",
      title: t("about.process.step2.title"),
      description: t("about.process.step2.description"),
    },
    {
      number: "03",
      title: t("about.process.step3.title"),
      description: t("about.process.step3.description"),
    },
    {
      number: "04",
      title: t("about.process.step4.title"),
      description: t("about.process.step4.description"),
    },
  ];

  return (
    <div className="min-h-screen relative" lang={locale === "bn" ? "bn" : "en"}>
      {/* Fixed Background Image */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <Image
          src="/aboutUs2.webp"
          alt="About Us Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Sections with Glassmorphism */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="min-h-screen flex items-center justify-center px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-8 border border-white/30"
              >
                <Sparkles className="w-4 h-4" />
                {t("about.hero.badge")}
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {t("about.hero.title_part1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                  {t("about.hero.title_part2")}
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              >
                {t("about.hero.description")}
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Bar */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-12 px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-7 h-7 text-emerald-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/aboutUs.webp"
                    alt="Premium cattle on sustainable farm"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                {/* Floating card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-400/30 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <div className="font-bold text-white">100% Verified</div>
                      <div className="text-sm text-white/80">DNA & Health</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-1 lg:order-2"
              >
                <div className="p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-emerald-300 font-semibold text-sm tracking-wider uppercase mb-3 block">
                    {t("about.story.title")}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {t("about.story.bridging")}
                  </h2>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {t("about.story.description1")}
                  </p>
                  <p className="text-white/90 mb-8 leading-relaxed">
                    {t("about.story.description2")}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-300 mt-0.5 shrink-0" />
                      <span className="text-white/90">
                        {t("about.story.check1")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-300 mt-0.5 shrink-0" />
                      <span className="text-white/90">
                        {t("about.story.check2")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-300 mt-0.5 shrink-0" />
                      <span className="text-white/90">
                        {t("about.story.check3")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-400/30 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-emerald-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t("about.mission.title")}
                </h3>
                <p className="text-white/85 leading-relaxed">
                  {t("about.mission.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-400/30 flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-amber-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t("about.vision.title")}
                </h3>
                <p className="text-white/85 leading-relaxed">
                  {t("about.vision.description")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-emerald-300 font-semibold text-sm tracking-wider uppercase mb-3 block">
                {t("about.whyChoose.label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t("about.whyChoose.title_part1")}{" "}
                <span className="text-emerald-300">
                  {t("about.whyChoose.title_part2")}
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      feature.color === "emerald"
                        ? "bg-emerald-400/30 text-emerald-300"
                        : feature.color === "blue"
                          ? "bg-blue-400/30 text-blue-300"
                          : feature.color === "green"
                            ? "bg-green-400/30 text-green-300"
                            : "bg-amber-400/30 text-amber-300"
                    }`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {t(`about.whyChoose.${feature.key}.title`)}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t(`about.whyChoose.${feature.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works - Process Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-emerald-300 font-semibold text-sm tracking-wider uppercase mb-3 block">
                {t("about.process.label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t("about.process.title_part1")}{" "}
                {t("about.process.title_part2")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="text-5xl font-bold text-emerald-300/30 mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-emerald-300/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Certifications / Trust Badges */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-emerald-300 font-semibold text-sm tracking-wider uppercase mb-3 block">
                {t("about.trust.label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t("about.trust.title_part1")} {t("about.trust.title_part2")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                {
                  name: t("about.trust.dnaVerified"),
                  icon: Shield,
                  color: "emerald",
                },
                {
                  name: t("about.trust.veterinaryCertified"),
                  icon: CheckCircle,
                  color: "blue",
                },
                {
                  name: t("about.trust.humaneFarmRaised"),
                  icon: Heart,
                  color: "rose",
                },
                {
                  name: t("about.trust.sustainablePractices"),
                  icon: LeafyGreen,
                  color: "green",
                },
                {
                  name: t("about.trust.usdaQuality"),
                  icon: Award,
                  color: "amber",
                },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <cert.icon
                    className={`w-5 h-5 ${
                      cert.color === "emerald"
                        ? "text-emerald-300"
                        : cert.color === "blue"
                          ? "text-blue-300"
                          : cert.color === "rose"
                            ? "text-rose-300"
                            : cert.color === "green"
                              ? "text-green-300"
                              : "text-amber-300"
                    }`}
                  />
                  <span className="font-medium text-white">{cert.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
