"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { CowGallery } from "@/components/cow/CowGallery";
import { getCowById } from "@/lib/data/cows";
import {
  Weight,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Heart,
  Share2,
  Zap,
  Leaf,
  Droplets,
  Sun,
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
  ArrowLeft,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const glassPanel = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

export default function CowDetailsPage() {
  const params = useParams();
  const cowId = params.id as string;
  const cow = getCowById(cowId);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const totalPrice = useMemo(() => {
    return cow ? cow.price * quantity : 0;
  }, [cow, quantity]);

  // Calculate booking progress
  const totalUnits = 12;
  const bookedUnits = totalUnits - (cow?.availableUnits || 0);
  const progressPercent = (bookedUnits / totalUnits) * 100;
  const isAlmostFull = progressPercent >= 75;
  const isFull = progressPercent >= 100;

  if (!cow) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center px-4"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Cow Not Found
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              The requested cow details could not be found.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </motion.button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedCows = [
    {
      id: "2",
      name: "Deshi Black",
      breed: "Local",
      price: 45000,
      image: "/cows/cow2.jpg",
      tag: "Heritage",
    },
    {
      id: "3",
      name: "Sahiwal",
      breed: "Dairy",
      price: 52000,
      image: "/cows/cow3.jpg",
      tag: "Premium",
    },
    {
      id: "4",
      name: "Cross Breed",
      breed: "Mixed",
      price: 38000,
      image: "/cows/cow4.jpg",
      tag: "Organic",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Immersive Hero Section with Parallax */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative min-h-screen pt-20 pb-12 overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-200 h-200 bg-emerald-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-150 h-150 bg-amber-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          </div>

          <div className="relative z-10 px-4 sm:px-8 max-w-screen-2xl mx-auto h-full mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left: Gallery (7 cols) */}
              <motion.div
                custom={0}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 relative "
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 bg-white">
                  <CowGallery cow={cow} />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute top-6 left-6 z-20"
                  >
                    <span
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-2",
                        cow.tagColor === "primary-fixed"
                          ? "bg-linear-to-r from-amber-500 to-orange-500 shadow-amber-500/30"
                          : "bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/30",
                      )}
                    >
                      <Sparkles className="w-4 h-4" />
                      {cow.tag || "Premium"} Grade
                    </span>
                  </motion.div>

                  {/* Image Overlay Info */}
                  <div className="absolute bottom-32 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-6 text-white"
                    >
                      <div className="flex items-center gap-2">
                        <Weight className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">{cow.weight} kg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">{cow.age} months</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold">
                          {cow.certification}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Floating Glass Cart (5 cols) */}
              <motion.div
                custom={0.2}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5 relative"
              >
                <div className="lg:sticky lg:top-28 space-y-6">
                  {/* Glassmorphism Cart Panel */}
                  <motion.div
                    variants={glassPanel}
                    className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-900/5 border border-white/50 overflow-hidden"
                  >
                    {/* Decorative gradient */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl" />

                    {/* Header */}
                    <div className="relative z-10 mb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">
                            {cow.name}
                          </h1>
                          <p className="text-emerald-600 font-semibold flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            {cow.breed} • {cow.certification}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsLiked(!isLiked)}
                            className="p-3 rounded-full bg-slate-100 hover:bg-rose-50 transition-colors"
                          >
                            <Heart
                              className={cn(
                                "w-5 h-5 transition-colors",
                                isLiked
                                  ? "fill-rose-500 text-rose-500"
                                  : "text-slate-600",
                              )}
                            />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-full bg-slate-100 hover:bg-emerald-50 transition-colors"
                          >
                            <Share2 className="w-5 h-5 text-slate-600" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="relative z-10 mb-8 p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-100">
                      <div className="flex items-baseline gap-1 text-emerald-700 mb-1">
                        <FaBangladeshiTakaSign className="text-2xl" />
                        <span className="text-5xl font-black tracking-tight">
                          {cow.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-emerald-600/80 font-medium">
                        per unit (1/12th share)
                      </p>
                    </div>

                    {/* Booking Progress */}
                    <div className="relative z-10 mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-semibold text-slate-700">
                            {cow.availableUnits} of {totalUnits} units available
                          </span>
                        </div>
                        {isAlmostFull && !isFull && (
                          <span className="text-amber-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Almost Full
                          </span>
                        )}
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{
                            duration: 1.2,
                            delay: 0.5,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className={cn(
                            "h-full rounded-full relative",
                            isFull
                              ? "bg-slate-400"
                              : isAlmostFull
                                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                                : "bg-gradient-to-r from-emerald-500 to-teal-400",
                          )}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </motion.div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {progressPercent > 0
                          ? `${Math.round(progressPercent)}% already booked by other investors`
                          : "Be the first to book this premium cow"}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="relative z-10 mb-6">
                      <label className="text-sm font-semibold text-slate-700 mb-3 block">
                        Select Units to Book
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 rounded-xl p-1">
                          {[1, 2, 3, 4].map((num) => (
                            <motion.button
                              key={num}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setQuantity(num)}
                              className={cn(
                                "w-12 h-12 rounded-lg font-bold text-sm transition-all",
                                quantity === num
                                  ? "bg-white text-emerald-600 shadow-md"
                                  : "text-slate-600 hover:text-emerald-600",
                              )}
                            >
                              {num}
                            </motion.button>
                          ))}
                        </div>
                        <span className="text-sm text-slate-500 font-medium">
                          Max 4 units per person
                        </span>
                      </div>
                    </div>

                    {/* Total & CTA */}
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl text-white">
                        <span className="font-medium">Total Investment</span>
                        <div className="flex items-center gap-1 text-2xl font-bold">
                          <FaBangladeshiTakaSign />
                          {totalPrice.toLocaleString()}
                        </div>
                      </div>

                      <Link
                        href={`/checkout?cowId=${cow.id}&quantity=${quantity}`}
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.02,
                            boxShadow:
                              "0 20px 40px -10px rgba(16, 185, 129, 0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isFull}
                          className={cn(
                            "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all",
                            isFull
                              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40",
                          )}
                        >
                          {isFull ? (
                            <>
                              <Clock className="w-5 h-5" />
                              Join Waitlist
                            </>
                          ) : (
                            <>
                              Book Now
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </Link>

                      {/* <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Secure Payment
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Instant Confirmation
                        </span>
                      </div> */}
                    </div>
                  </motion.div>

                  {/* Quick Stats Cards */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-3"
                  >
                    {[
                      {
                        icon: Leaf,
                        label: "Organic Feed",
                        value: "100% Natural",
                      },
                      {
                        icon: Droplets,
                        label: "Water Source",
                        value: "Purified",
                      },
                      { icon: Sun, label: "Sunlight", value: "12 hrs/day" },
                      { icon: MapPin, label: "Location", value: "Farm #42" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        variants={glassPanel}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-lg"
                      >
                        <stat.icon className="w-5 h-5 text-emerald-600 mb-2" />
                        <p className="text-xs text-slate-500 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Story & Details Section */}
        <section className="relative z-20 bg-white py-20">
          <div className="px-4 sm:px-8 max-w-screen-2xl mx-auto">
            {/* Section Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-12"
            >
              <div className="bg-slate-100 p-1 rounded-2xl inline-flex">
                {["details", "Certification"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-8 py-3 rounded-xl font-semibold text-sm transition-all capitalize",
                      activeTab === tab
                        ? "bg-white text-emerald-600 shadow-md"
                        : "text-slate-600 hover:text-slate-900",
                    )}
                  >
                    {tab === "Certification" ? "Certification" : `${tab}`}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Content Based on Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className="space-y-6">
                    <h2 className="text-4xl font-black text-slate-900 leading-tight">
                      Raised with Care, <br />
                      <span className="text-emerald-600">
                        Ready for Your Table
                      </span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {cow.name} comes from our premium heritage breeding
                      program, raised on organic pastures with 100% natural
                      feed. Each cow receives individual attention from our
                      expert veterinary team, ensuring optimal health and meat
                      quality.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Born and raised in Bangladesh",
                        "100% organic grass-fed diet",
                        "Regular health monitoring",
                        "Ethical farming practices",
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-medium text-slate-800">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-emerald-100">
                      <Image
                        src={cow.image}
                        alt={`${cow.name} grazing`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-900">
                            98%
                          </p>
                          <p className="text-sm text-slate-500">
                            Customer Satisfaction
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Certification" && (
                <motion.div
                  key="Certification"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {[
                    {
                      label: "Weight",
                      value: `${cow.weight} kg`,
                      icon: Weight,
                      desc: "Live weight at processing",
                    },
                    {
                      label: "Age",
                      value: `${cow.age} months`,
                      icon: Calendar,
                      desc: "Optimal maturity age",
                    },
                    {
                      label: "Breed",
                      value: cow.breed,
                      icon: ShieldCheck,
                      desc: "Certified pure breed",
                    },
                    {
                      label: "Feed Type",
                      value: "Organic Grass",
                      icon: Leaf,
                      desc: "100% natural diet",
                    },
                    {
                      label: "Health Score",
                      value: "A+",
                      icon: Zap,
                      desc: "Veterinary certified",
                    },
                    {
                      label: "Processing",
                      value: "14 Days",
                      icon: Clock,
                      desc: "From booking to delivery",
                    },
                  ].map((spec, i) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        <spec.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <p className="text-sm text-slate-500 mb-1">
                        {spec.label}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 mb-2">
                        {spec.value}
                      </p>
                      <p className="text-xs text-slate-400">{spec.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "care" && (
                <motion.div
                  key="care"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-3xl mx-auto text-center space-y-8"
                >
                  <h3 className="text-3xl font-bold text-slate-900">
                    Our Care Promise
                  </h3>
                  <p className="text-lg text-slate-600">
                    Every cow in our program receives premium care standards
                    that exceed industry requirements. From daily health checks
                    to stress-free living conditions, we ensure the highest
                    quality of life.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Daily Checks",
                        desc: "Veterinary inspection every morning",
                      },
                      {
                        title: "Premium Feed",
                        desc: "Organic, locally sourced nutrition",
                      },
                      {
                        title: "Spacious Living",
                        desc: "2 acres per cow minimum",
                      },
                    ].map((item, i) => (
                      <div key={i} className="bg-emerald-50 rounded-2xl p-6">
                        <h4 className="font-bold text-emerald-800 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-emerald-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Related Cows - Cross Selling */}
        <section className="bg-slate-50 py-20 border-t border-slate-200">
          <div className="px-4 sm:px-8 max-w-screen-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  You Might Also Like
                </h2>
                <p className="text-slate-600">
                  Other premium cattle available for investment
                </p>
              </div>
              <Link href="/">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCows.map((relatedCow, i) => (
                <motion.div
                  key={relatedCow.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-900/5 transition-all border border-slate-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={relatedCow.image}
                      alt={relatedCow.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-emerald-700">
                        {relatedCow.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-bold text-lg">{relatedCow.name}</p>
                      <p className="text-sm opacity-90">{relatedCow.breed}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-emerald-600 font-bold text-xl">
                        <FaBangladeshiTakaSign />
                        {relatedCow.price.toLocaleString()}
                      </div>
                      <Link href={`/cows/${relatedCow.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-semibold text-sm hover:bg-emerald-200 transition-colors"
                        >
                          View Details
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="bg-emerald-900 py-16">
          <div className="px-4 sm:px-8 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "2,500+", label: "Cows Sold" },
                { value: "4.9/5", label: "Customer Rating" },
                { value: "100%", label: "Organic Feed" },
                { value: "14 Days", label: "Delivery Time" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-white"
                >
                  <p className="text-3xl md:text-4xl font-black mb-2">
                    {stat.value}
                  </p>
                  <p className="text-emerald-200 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Utility for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
