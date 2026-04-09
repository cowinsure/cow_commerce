"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useProduct } from "@/hooks/product/useProduct";
import { CowDetails, LivestockItem } from "@/lib/models/productDTO";

// Adapter to map CowDetails API response to page expected format
interface CowDetailsAdapter {
  id: number;
  name: string;
  breed: string;
  price: number;
  image: string;
  tag: string;
  tagColor: string;
  weight: number;
  age: number;
  certification: string;
  availableUnits: number;
  gender: string;
  color: string;
}

function mapCowDetailsToAdapter(details: CowDetails): CowDetailsAdapter {
  const baseImageUrl = process.env.NEXT_PUBLIC_API_BASE_IMAGE_URL || "";
  const getImageUrl = (path: string) => {
    if (!path || ["None", "null", "undefined"].includes(path)) return null;

    // Absolute URL
    if (path.startsWith("http")) return path;

    // Relative path → attach base URL properly
    return `${baseImageUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };
  const imageUrl = getImageUrl(details.left_side_image);
  return {
    id: details.id,
    name: details.name || `${details.breed} #${details.id}`,
    breed: details.breed,
    price: details.weight_kg * 1000,
    image: imageUrl ?? "/cowImg/fallback.jpg",
    tag: details.vet_certificate ? "Premium" : "Standard",
    tagColor: details.vet_certificate ? "primary-fixed" : "secondary",
    weight: details.weight_kg,
    age: details.age_in_months,
    certification: details.vet_certificate ? "Verified" : "Pending",
    availableUnits: 8,
    gender: details.gender,
    color: details.color,
  };
}

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { CowGallery } from "@/components/cow/CowGallery";
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
  Ruler,
  Palette,
  Syringe,
  Activity,
  Play,
  Pause,
  Volume2,
  ClipboardList,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Link from "next/link";
import { AnimatedPrice } from "@/components/ui/CounterAnimation";
import { CircularShareMenu } from "@/components/ui/ShareMenu";
import { CowImageGallery } from "@/components/cow/CowImageGallery";
import { CowVideoPlayer } from "@/components/cow/CowVideoPlayer";
import { BreedAdvantages } from "@/components/ui/BreedContent";

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
  const searchParams = useSearchParams();
  const { cowDetails, fetchCowDetails, loading } = useProduct();
  const cowId = params.id as string;
  const numericCowId = parseInt(cowId, 10);

  // Get preloaded cow data from URL query parameter
  const preloadedCowData = searchParams.get("data");
  const preloadedCow = useMemo(() => {
    if (!preloadedCowData) return null;
    try {
      return JSON.parse(atob(preloadedCowData)) as LivestockItem;
    } catch {
      return null;
    }
  }, [preloadedCowData]);

  // Fetch cow details on mount (always fetch for full details)
  useEffect(() => {
    if (numericCowId) {
      fetchCowDetails(numericCowId);
    }
  }, [numericCowId, fetchCowDetails]);

  // Map API response to page-compatible format
  const cow = cowDetails?.[0] ? mapCowDetailsToAdapter(cowDetails[0]) : null;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  // const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  // const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

  // Use price from adapter for calculations
  const totalPrice = useMemo(() => {
    return preloadedCow?.unit_price ? preloadedCow?.unit_price * quantity : 0;
  }, [cow, quantity]);

  // Calculate booking progress
  const totalUnits = preloadedCow?.unit_qty ?? 0;
  const bookedUnits =
    (preloadedCow?.unit_qty ?? 0) - (preloadedCow?.available_qty ?? 0);
  const progressPercent = totalUnits > 0 ? (bookedUnits / totalUnits) * 100 : 0;
  // const isAlmostFull = progressPercent >= 75;
  const isFull = progressPercent >= 100;

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <main className="flex-1 flex items-center justify-center pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4"
          >
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <p className="text-lg font-semibold text-slate-700 mb-2">
                  Loading Cow Details
                </p>
                <p className="text-sm text-slate-500">
                  Fetching premium livestock information...
                </p>
              </motion.div>
              {/* Skeleton Animation */}
              <motion.div
                className="mt-8 max-w-md mx-auto space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto animate-pulse"></div>
                <div className="h-32 bg-slate-200 rounded-2xl mt-6 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // Show error state if no cow data found
  if (!cow) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
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

  console.log(preloadedCow);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="grow">
        {/* Immersive Hero Section with Parallax */}
        <motion.section
          // style={{ y: heroY, opacity: heroOpacity }}
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
                  {cowDetails[0] ? (
                    <CowGallery cow={cowDetails[0]} />
                  ) : (
                    <div className="relative aspect-4/3">
                      <Image
                        alt={cow.name}
                        src={cow.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  {/* Floating Badge */}
                  {/* <motion.div
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
                          : "bg-linear-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/30",
                      )}
                    >
                      <Sparkles className="w-4 h-4" />
                      {cow.tag || "Premium"} Grade
                    </span>
                  </motion.div> */}

                  {/* Image Overlay Info */}
                  <div className="absolute bottom-32 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-8">
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
                <div className="lg:sticky space-y-6">
                  {/* Glassmorphism Cart Panel */}
                  <motion.div
                    variants={glassPanel}
                    className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-emerald-900/5 border border-white/50 "
                  >
                    {/* Decorative linear */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl" />

                    {/* Header */}
                    <div className="relative z-10 mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">
                            {cow.name}
                          </h1>
                          <p className="text-white bg-emerald-500 font-semibold flex items-center gap-1 border rounded-full px-2 py-1 text-xs mb-1">
                            <ShieldCheck className="w-4 h-4" />
                            Vet Certified
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {/* <motion.button
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
                          </motion.button> */}
                          {/* Like & Share */}
                          <div className="flex gap-2">
                            {/* Circular Share Menu */}
                            <CircularShareMenu
                              shareUrl={`https://yoursite.com/cows/${cow.id}`}
                              shareTitle={`Check out ${cow.name} - Premium ${cow.breed}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="relative z-10 mb-8 p-6 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-100 flex ">
                      <div className="flex items-baseline gap-1 text-emerald-700 mb-1">
                        <FaBangladeshiTakaSign className="text-2xl" />
                        <AnimatedPrice
                          value={preloadedCow?.unit_price || 0}
                          duration={2}
                          className="text-5xl font-black tracking-tight"
                        />
                      </div>
                      <small className="text-emerald-600/80 font-medium flex items-center mt-3 ml-1">
                        /per unit
                      </small>
                    </div>

                    {/* Booking Progress */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-gray-700/60 font-medium flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {preloadedCow?.available_qty ?? 0} of {totalUnits}{" "}
                          units available
                        </span>
                        {progressPercent >= 75 && (
                          <span className="text-amber-600 font-bold text-[10px] uppercase tracking-wider">
                            Almost Full
                          </span>
                        )}
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className={cn(
                            "h-full rounded-full transition-all",
                            progressPercent >= 90
                              ? "bg-amber-500"
                              : progressPercent >= 50
                                ? "bg-gray-500"
                                : "bg-teal-400",
                          )}
                        />
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="relative z-10 mb-4">
                      <label className="text-sm font-semibold text-slate-700 mb-3 block">
                        Select Units to Book
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 rounded-xl p-1">
                          {/* Decrease Button */}
                          <motion.button
                            whileHover={{ scale: quantity > 1 ? 1.05 : 1 }}
                            whileTap={{ scale: quantity > 1 ? 0.95 : 1 }}
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            disabled={quantity <= 1}
                            className={cn(
                              "w-12 h-12 rounded-lg font-bold text-lg transition-all flex items-center justify-center",
                              quantity > 1
                                ? "bg-white text-emerald-600 shadow-sm hover:text-emerald-700"
                                : "text-slate-300 cursor-not-allowed",
                            )}
                          >
                            −
                          </motion.button>

                          {/* Quantity Display */}
                          <div className="w-14 h-12 flex items-center justify-center">
                            <motion.span
                              key={quantity}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className="font-bold text-lg text-slate-900"
                            >
                              {quantity}
                            </motion.span>
                          </div>

                          {/* Increase Button */}
                          <motion.button
                            whileHover={{
                              scale:
                                quantity < (preloadedCow?.available_qty ?? 0)
                                  ? 1.05
                                  : 1,
                            }}
                            whileTap={{
                              scale:
                                quantity < (preloadedCow?.available_qty ?? 0)
                                  ? 0.95
                                  : 1,
                            }}
                            onClick={() =>
                              setQuantity(
                                Math.min(
                                  preloadedCow?.available_qty ?? 0,
                                  quantity + 1,
                                ),
                              )
                            }
                            disabled={
                              quantity >= (preloadedCow?.available_qty ?? 0)
                            }
                            className={cn(
                              "w-12 h-12 rounded-lg font-bold text-lg transition-all flex items-center justify-center",
                              quantity < (preloadedCow?.available_qty ?? 0)
                                ? "bg-white text-emerald-600 shadow-sm hover:text-emerald-700"
                                : "text-slate-300 cursor-not-allowed",
                            )}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Total & CTA */}
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between border-slate-900 rounded-xl text-gray-500">
                        <span className="font-medium">Total Unit Price</span>
                        <div className="flex items-center gap-1 text-2xl font-bold">
                          <FaBangladeshiTakaSign />
                          {totalPrice.toLocaleString()}
                        </div>
                      </div>

                      <Link
                        href={`/checkout?cowId=${preloadedCow?.livestock_id}&quantity=${quantity}&data=${btoa(JSON.stringify(preloadedCow))}`}
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
                              : "bg-linear-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40",
                          )}
                        >
                          {isFull ? (
                            <>
                              <Clock className="w-5 h-5" />
                              Join Waitlist
                            </>
                          ) : (
                            <span className="flex items-center justify-between w-full px-4">
                              <span className="flex items-center gap-2">
                                Book Now
                                <ArrowRight className="w-5 h-5" />
                              </span>
                              <span className="flex items-center gap-2">
                                <p className="font-semibold text-sm">For</p>
                                <div className="flex items-center gap-0.5">
                                  {/* <FaBangladeshiTakaSign />{" "} */}
                                  {preloadedCow?.booking_amount.toLocaleString()}
                                  <small className="text-xs mt-1 font-normal">
                                    /BDT
                                  </small>
                                </div>
                              </span>
                            </span>
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
                    className="grid grid-cols-4 gap-3"
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
                      { icon: MapPin, label: "Location", value: "InsureCow" },
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

        {/* Tab Section */}
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
                {["details", "gallery"].map((tab) => (
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
                    {tab === "Gallery" ? "Gallery" : `${tab}`}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Content Based on Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "details" && cowDetails[0] && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left: Specifications - Clean List Style */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <ClipboardList className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900">
                          Specifications
                        </h2>
                        <p className="text-sm text-slate-500">
                          Complete animal profile
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-2 shadow-lg shadow-slate-200/50 border border-slate-100">
                      {/* Spec List */}
                      <div className="divide-y divide-slate-100">
                        {/* Age */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Calendar className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-slate-600">
                              Age
                            </span>
                          </div>
                          <span className="font-bold text-slate-900">
                            {cowDetails[0].age_in_months} Months
                          </span>
                        </motion.div>

                        {/* Weight */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Weight className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-slate-600">
                              Weight
                            </span>
                          </div>
                          <span className="font-bold text-slate-900">
                            {cowDetails[0].weight_kg} kg
                          </span>
                        </motion.div>

                        {/* Height */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Ruler className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-slate-600">
                              Height
                            </span>
                          </div>
                          <span className="font-bold text-slate-900">
                            {cowDetails[0].height} ft
                          </span>
                        </motion.div>

                        {/* Color */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Palette className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-slate-600">
                              Color
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 capitalize">
                              {cowDetails[0].color || "N/A"}
                            </span>
                          </div>
                        </motion.div>

                        {/* Gender */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.25 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Activity className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-slate-600">
                              Gender
                            </span>
                          </div>
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold uppercase",
                              cowDetails[0].gender === "male"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-pink-100 text-pink-700",
                            )}
                          >
                            {cowDetails[0].gender || "N/A"}
                          </span>
                        </motion.div>

                        {/* Vaccine */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <Syringe className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-slate-600">
                              Vaccination
                            </span>
                          </div>
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold",
                              cowDetails[0].vaccine_status
                                ?.toLowerCase()
                                .includes("vaccinated")
                                ? "bg-emerald-100 text-emerald-700"
                                : "text-amber-600",
                            )}
                          >
                            {cowDetails[0].vaccine_status || "N/A"}
                          </span>
                        </motion.div>

                        {/* Deworming */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.35 }}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                              <ShieldCheck className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-600">
                                Deworming
                              </span>
                              {cowDetails[0].last_deworming_date && (
                                <span className="text-xs text-slate-400">
                                  Last: {cowDetails[0].last_deworming_date}
                                </span>
                              )}
                            </div>
                          </div>
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold",
                              cowDetails[0].deworming_status
                                ?.toLowerCase()
                                .includes("dewormed")
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700",
                            )}
                          >
                            {cowDetails[0].deworming_status || "N/A"}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Daily Feed", value: "12kg", icon: Leaf },
                        { label: "Water Intake", value: "40L", icon: Droplets },
                        { label: "Exercise", value: "4hrs", icon: Sun },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-100"
                        >
                          <stat.icon className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                          <p className="text-xs text-emerald-600 font-medium">
                            {stat.label}
                          </p>
                          <p className="text-sm font-bold text-emerald-900">
                            {stat.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right: Video Player */}
                  <CowVideoPlayer
                    videoUrl={cowDetails[0].muzzle_video}
                    cowName={cow.name}
                  />
                </motion.div>
              )}

              {activeTab === "gallery" &&
                (cowDetails?.[0] ? (
                  <motion.div
                    key="Gallery"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <CowImageGallery cow={cowDetails[0]} />
                  </motion.div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    No gallery available
                  </div>
                ))}

              {/* {activeTab === "care" && (
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
              )} */}
            </AnimatePresence>
          </div>
        </section>

        {/* Breed Advantages */}
        <section className="relative z-20 bg-white py-20">
          <BreedAdvantages breed={cow.breed as "Sahiwal" | "Deshi"} />
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
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={relatedCow.image}
                      alt={relatedCow.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
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
    </div>
  );
}

// Utility for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
