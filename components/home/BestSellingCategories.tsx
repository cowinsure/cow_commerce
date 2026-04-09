"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import Image from "next/image";
import { TrendingUp, Users, Star, ArrowRight } from "lucide-react";
import SectionMiniHeading from "../ui/SectionMiniHeading";

const categories = [
  {
    id: "angus",
    name: "Angus Reserve",
    tagline: "Premium Black Angus Excellence",
    description:
      "World-renowned for exceptional marbling and superior meat quality. Our Angus selection represents the pinnacle of beef genetics.",
    image:"/cowImg/WhatsApp Image 2026-04-01 at 3.57.13 PM.jpeg",
    stats: {
      sales: "2,450",
      rating: 4.9,
      price: "From $12,400",
      growth: "+12%",
    },
    features: ["DNA Verified", "Prime Grade", "Full Pedigree"],
    color: "primary",
  },
  {
    id: "wagyu",
    name: "Wagyu Heritage",
    tagline: "Japanese A5 Genetics",
    description:
      "Authentic Wagyu bloodlines producing the world's most prized beef. Exceptional intramuscular fat distribution for unmatched flavor.",
    image:"/cowImg/WhatsApp Image 2026-04-01 at 3.57.20 PM.jpeg",
    stats: {
      sales: "890",
      rating: 5.0,
      price: "From $18,200",
      growth: "+24%",
    },
    features: ["A5 Grade Certified", "Japanese Lineage", "BMS 9+"],
    color: "tertiary",
  },
  {
    id: "hereford",
    name: "Hereford Prime",
    tagline: "Classic British Heritage",
    description:
      "Time-proven breed known for excellent mothering ability, gentle temperament, and consistent meat quality.",
    image:"/cowImg/WhatsApp Image 2026-04-01 at 3.57.31 PM.jpeg",
    stats: {
      sales: "3,120",
      rating: 4.8,
      price: "From $8,950",
      growth: "+8%",
    },
    features: ["Grass-Fed Ready", "High Fertility", "Easy Calving"],
    color: "primary-fixed",
  },
];

interface BestSellingCategoriesProps {
  className?: string;
}

export function BestSellingCategories({
  className,
}: BestSellingCategoriesProps) {
  return (
    <section className={cn("py-24 px-6 max-w-screen-2xl mx-auto", className)}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <SectionMiniHeading heading="Top Categories" />
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Best Selling Categories
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
          Explore our most popular breed categories, trusted by farmers and
          ranchers worldwide
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="group relative bg-surface-container rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary-fixed/30 transition-all"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <Image
                alt={category.name}
                src={category.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />

              {/* Price Tag */}
              <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-bold">
                  {category.stats.price}
                </span>
              </div>

              {/* Growth Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-success/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-bold">
                  {category.stats.growth}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Tagline */}
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-wider mb-2 block",
                  category.color === "primary" && "text-primary",
                  category.color === "tertiary" && "text-tertiary",
                  category.color === "primary-fixed" && "text-primary-fixed",
                )}
              >
                {category.tagline}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">{category.name}</h3>

              {/* Description */}
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                {category.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-low rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-outline" />
                    <span className="text-xs text-outline font-bold uppercase">
                      Sold
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    {category.stats.sales}+
                  </span>
                </div>
                <div className="bg-surface-container-low rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-warning" />
                    <span className="text-xs text-outline font-bold uppercase">
                      Rating
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    {category.stats.rating}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {category.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1 bg-surface-container rounded-full text-on-surface-variant"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={cn(
                  "w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all",
                  category.color === "primary" &&
                    "bg-primary text-on-primary hover:bg-primary/90",
                  category.color === "tertiary" &&
                    "bg-tertiary text-on-tertiary hover:bg-tertiary/90",
                  category.color === "primary-fixed" &&
                    "bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed/90",
                )}
              >
                Browse Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 bg-surface-container rounded-3xl p-8 flex flex-wrap justify-center gap-12"
      >
        <div className="text-center">
          <div className="text-4xl font-black text-primary mb-2">6,460+</div>
          <div className="text-sm text-on-surface-variant font-medium">
            Total Cows Sold
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-primary mb-2">98.5%</div>
          <div className="text-sm text-on-surface-variant font-medium">
            Customer Satisfaction
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-primary mb-2">15+</div>
          <div className="text-sm text-on-surface-variant font-medium">
            Years Experience
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-primary mb-2">24/7</div>
          <div className="text-sm text-on-surface-variant font-medium">
            Support Available
          </div>
        </div>
      </motion.div>
    </section>
  );
}
