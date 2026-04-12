"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import {
  Weight,
  Calendar,
  PieChart,
  ShieldCheck,
  ArrowRight,
  Users,
} from "lucide-react";
import Link from "next/link";

import { LivestockItem } from "@/lib/models/productDTO";
import { ImageWithUrl } from "@/hooks/useImage";

interface ProductCardProps {
  cow: LivestockItem;
  className?: string;
  viewMode?: "grid" | "list";
  index?: number;
}

export function ProductCard({
  cow,
  className,
  viewMode = "grid",
  index = 0,
}: ProductCardProps) {
  const isListView = viewMode === "list";

  // Calculate booking progress
  const totalUnits = cow.unit_qty; // Assuming 12 units per cow
  const bookedUnits = totalUnits - (cow.available_qty ?? 0);
  const progressPercent = (bookedUnits / totalUnits) * 100;

  const cowData = btoa(JSON.stringify(cow));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative bg-white rounded-2xl border border-emerald-100",
        "shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-500/10",
        "transition-all duration-300",
        isListView && "flex flex-row",
        className,
      )}
    >
      {/* <ForSaleSticker variant="default" position="top-left" /> */}
      {/* Image Section */}
      <div
        className={cn(
          "relative overflow-hidden",
          isListView ? "w-72 shrink-0" : "aspect-4/3",
        )}
      >
        <ImageWithUrl
          alt={cow.breed}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-2xl"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={cow.image_with_owner} // TODO: Get from API when image field is available
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-emerald-950/60 via-transparent to-transparent" />

        {/* Progress Badge (if partially booked) */}
        {/* {progressPercent > 0 && progressPercent < 100 && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" />
              {Math.round(progressPercent)}% Booked
            </div>
          </div>
        )} */}

        {/* List View: Quick Stats Overlay */}
        {isListView && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-4 text-white text-sm">
              <span className="flex items-center gap-1.5">
                <Weight className="w-4 h-4" />
                {cow.weight_kg} kg
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {cow.livestock_id} mo
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={cn(
          "flex-1 p-4 flex flex-col",
          isListView && "justify-between",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex justify-between items-start mb-3",
            isListView && "mb-4",
          )}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-950 mb-1 group-hover:text-gray-700 transition-colors">
              {cow.breed}
            </h3>
            {/* <span className="text-xs font-semibold text-gray-600/70 uppercase tracking-wider">
              {cow.owner}
            </span> */}
          </div>
          <div className="text-right">
            <span className=" text-2xl font-black text-emerald-600 flex items-center -mb-2">
              <FaBangladeshiTakaSign /> {(cow.unit_price ?? 0).toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-500/60 font-bold uppercase tracking-wider">
              per unit
            </span>
          </div>
        </div>

        {/* Booking Progress Bar (Grid View) */}
        {!isListView && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-700/60 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {cow.available_qty ?? 0} of {totalUnits} units available
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
        )}

        {/* Attributes Grid */}
        <div
          className={cn(
            "grid gap-y-2.5 mb-5",
            isListView ? "grid-cols-4 gap-4" : "grid-cols-2",
          )}
        >
          <div className="flex items-center gap-2.5 text-gray-800">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Weight className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500/60 font-bold uppercase tracking-wider">
                Weight
              </p>
              <p className="text-sm font-semibold">{cow.weight_kg} kg</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-800">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500/60 font-bold uppercase tracking-wider">
                Age
              </p>
              <p className="text-sm font-semibold">...</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-800">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <PieChart className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500/60 font-bold uppercase tracking-wider">
                Available
              </p>
              <p className="text-sm font-semibold">
                {cow.available_qty ?? 0} Units
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-800">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500/60 font-bold uppercase tracking-wider">
                Certified by
              </p>
              <p className="text-sm font-semibold truncate">Vet</p>
            </div>
          </div>
        </div>

        {/* Footer: CTA + Meta */}
        <div
          className={cn(
            "flex items-center gap-4 mt-auto",
            isListView && "border-t border-emerald-100 pt-4",
          )}
        >
          <Link
            href={`/cows/${cow.livestock_id}?data=${cowData}`}
            className="w-full"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 bg-emerald-500 text-white rounded-xl font-bold text-sm w-full cursor-pointer shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 group/btn"
            >
              Book Units
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          {/* Estimated Processing */}
          {/* <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600/60 font-medium shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>Est. 14 days</span>
          </div> */}
        </div>
      </div>

      {/* Hover Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
