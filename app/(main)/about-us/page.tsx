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

export default function AboutUsPage() {
  const { t } = useLocalization();

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background decorations */}
        <div className="absolute top-20 -left-32 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              {t("about.hero.badge")}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              {t("about.hero.title_part1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                {t("about.hero.title_part2")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              {t("about.hero.description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-emerald-600/25"
              >
                {t("about.hero.browseCows")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold border border-slate-200 transition-all"
              >
                {t("about.hero.getInTouch")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32">
        <div className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                <Image
                  src="/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg"
                  alt="Premium cattle on sustainable farm"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      100% Verified
                    </div>
                    <div className="text-sm text-slate-500">DNA & Health</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase mb-3 block">
                {t("about.story.title")}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                {t("about.story.bridging")}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t("about.story.description1")}
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t("about.story.description2")}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700">
                    {t("about.story.check1")}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700">
                    {t("about.story.check2")}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700">
                    {t("about.story.check3")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {t("about.mission.title")}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t("about.mission.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {t("about.vision.title")}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {t("about.vision.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32">
        <div className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase mb-3 block">
              {t("about.whyChoose.label")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {t("about.whyChoose.title_part1")}{" "}
              <span className="text-emerald-600">
                {t("about.whyChoose.title_part2")}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-600/10 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.color === "emerald"
                      ? "bg-emerald-100 text-emerald-600"
                      : feature.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : feature.color === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-amber-100 text-amber-600"
                  }`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {t(`about.whyChoose.${feature.key}.title`)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`about.whyChoose.${feature.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Process Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase mb-3 block">
              {t("about.process.label")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {t("about.process.title_part1")} {t("about.process.title_part2")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-5xl font-bold text-emerald-100 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-emerald-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications / Trust Badges */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase mb-3 block">
              {t("about.trust.label")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {t("about.trust.title_part1")} {t("about.trust.title_part2")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 lg:gap-8"
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
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-50 border border-slate-200"
              >
                <cert.icon
                  className={`w-5 h-5 ${
                    cert.color === "emerald"
                      ? "text-emerald-600"
                      : cert.color === "blue"
                        ? "text-blue-600"
                        : cert.color === "rose"
                          ? "text-rose-600"
                          : cert.color === "green"
                            ? "text-green-600"
                            : "text-amber-600"
                  }`}
                />
                <span className="font-medium text-slate-700">{cert.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-6 lg:px-8 lg:max-w-screen-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/marketplace"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-emerald-700 rounded-xl font-bold text-lg transition-all hover:shadow-xl"
              >
                {t("about.cta.browseAvailable")}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+8801234567890"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-lg transition-all border border-emerald-500"
              >
                {t("about.cta.callNow")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
