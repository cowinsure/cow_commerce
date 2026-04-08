"use client";

import { cn } from "@/lib/theme/theme.config";
import { motion, Variants } from "framer-motion";
import {
  Beef,
  Utensils,
  Flame,
  Award,
  Droplets,
  ChevronRight,
  Star,
} from "lucide-react";

// Breed data type
type BreedCategory = "Sahiwal" | "Deshi";

interface BreedContent {
  title: string;
  pros: string[];
  taste: string;
  bestDishes: string[];
}

interface BreedAdvantagesProps {
  breed: BreedCategory;
  className?: string;
}

export const breedContentMap: Record<BreedCategory, BreedContent> = {
  Sahiwal: {
    title: "Premium Tender Beef",
    pros: [
      "Soft and tender meat texture",
      "Balanced fat for juicy flavor",
      "Ideal for slow cooking and curries",
      "Consistent quality due to controlled breeding",
    ],
    taste: "Rich, juicy, slightly fatty",
    bestDishes: [
      "Kacchi Biryani",
      "Beef Rezala",
      "Beef Kala Bhuna",
      "Beef Tehari",
    ],
  },

  Deshi: {
    title: "Authentic Traditional Beef",
    pros: [
      "Deep, strong beef flavor",
      "Leaner and more fibrous meat",
      "Naturally raised (often grass-fed)",
      "Preferred for traditional recipes",
    ],
    taste: "Strong, earthy, less fatty",
    bestDishes: [
      "Bhuna Mangsho",
      "Beef Curry (Deshi style)",
      "Shutki-style dry beef",
      "Beef Vuna Khichuri",
    ],
  },
};

// Animation variants
const containerVariants = {
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
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

export function BreedAdvantages({ breed, className }: BreedAdvantagesProps) {
  const content = breedContentMap[breed];

  if (!content) return null;

  const isSahiwal = breed === "Sahiwal";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 max-w-screen-2xl mx-auto py-6",
        className,
      )}
    >
      {/* Background gradient based on breed */}
      <div
        className={cn(
          "absolute inset-0 opacity-5 bg-linear-to-br from-emerald-500 to-emerald-600",
        )}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-emerald-100/20 to-transparent rounded-full blur-2xl" />

      <div className="relative z-10 px-4 sm:px-8 ">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                isSahiwal
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-emerald-100 text-emerald-600",
              )}
            >
              <Beef className="w-6 h-6" />
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                isSahiwal
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-emerald-100 text-emerald-700",
              )}
            >
              {breed} Breed
            </span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">
            {content.title}
          </h3>
          <p className="text-slate-600">
            Discover why {breed} beef is prized by chefs and home cooks across
            Bangladesh
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pros Section */}
          <motion.div
            variants={cardVariants}
            custom={0}
            whileHover="hover"
            className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award
                className={cn(
                  "w-5 h-5",
                  isSahiwal ? "text-emerald-600" : "text-emerald-600",
                )}
              />
              <h4 className="font-bold text-slate-900">Key Advantages</h4>
            </div>
            <ul className="space-y-3">
              {content.pros.map((pro, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                      isSahiwal
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-emerald-100 text-emerald-600",
                    )}
                  >
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-slate-700 text-sm leading-relaxed">
                    {pro}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Taste Profile */}
          <motion.div
            variants={cardVariants}
            custom={1}
            whileHover="hover"
            className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20",
                isSahiwal ? "bg-emerald-400" : "bg-emerald-400",
              )}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-5 h-5 text-white/80" />
                <h4 className="font-bold">Taste Profile</h4>
              </div>
              <p className="text-2xl font-black mb-2">{content.taste}</p>
              <div className="flex items-center gap-2 mt-4">
                {isSahiwal ? (
                  <>
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs font-medium text-emerald-300">
                      Tender
                    </span>
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs font-medium text-emerald-300">
                      Juicy
                    </span>
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs font-medium text-emerald-300">
                      Rich
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs font-medium text-emerald-300">
                      Earthy
                    </span>
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs font-medium text-emerald-300">
                      Lean
                    </span>
                    <span className="px-2 py-1 bg-emerald-500/20 rounded text-xs font-medium text-emerald-300">
                      Bold
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Best Dishes */}
          <motion.div
            variants={cardVariants}
            custom={2}
            whileHover="hover"
            className={cn(
              "lg:col-span-2 rounded-2xl p-6 border",
              isSahiwal
                ? "bg-emerald-50/50 border-emerald-100"
                : "bg-emerald-50/50 border-emerald-100",
            )}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  isSahiwal
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-emerald-100 text-emerald-600",
                )}
              >
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">
                  Perfect For These Dishes
                </h4>
                <p className="text-xs text-slate-500">
                  Chef-recommended preparations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {content.bestDishes.map((dish, index) => (
                <motion.div
                  key={dish}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={cn(
                    "group relative bg-white rounded-xl p-4 shadow-sm border transition-all cursor-default",
                    isSahiwal
                      ? "border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100"
                      : "border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100",
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Flame
                      className={cn(
                        "w-4 h-4",
                        isSahiwal ? "text-emerald-500" : "text-emerald-500",
                      )}
                    />
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                  <p className="font-semibold text-slate-800 text-sm leading-tight">
                    {dish}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Ethically Raised
              </p>
              <p className="text-xs text-slate-500">
                100% natural feed • No hormones
              </p>
            </div>
          </div>
          <span
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold",
              isSahiwal
                ? "bg-emerald-600 text-white"
                : "bg-emerald-600 text-white",
            )}
          >
            {breed} Certified
          </span>
        </motion.div> */}
      </div>
    </motion.div>
  );
}

// Compact version for smaller spaces
export function CompactBreedAdvantages({
  breed,
  className,
}: BreedAdvantagesProps) {
  const content = breedContentMap[breed];
  if (!content) return null;

  const isSahiwal = breed === "Sahiwal";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-lg border",
        isSahiwal ? "border-emerald-100" : "border-emerald-100",
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Beef
          className={cn(
            "w-5 h-5",
            isSahiwal ? "text-emerald-600" : "text-emerald-600",
          )}
        />
        <h4 className="font-bold text-slate-900">{content.title}</h4>
      </div>

      <div className="space-y-2 mb-4">
        {content.pros.slice(0, 2).map((pro, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <Star
              className={cn(
                "w-3 h-3",
                isSahiwal ? "text-emerald-500" : "text-emerald-500",
              )}
            />
            {pro}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "text-xs font-medium px-3 py-2 rounded-lg",
          isSahiwal
            ? "bg-emerald-50 text-emerald-700"
            : "bg-emerald-50 text-emerald-700",
        )}
      >
        Best for: {content.bestDishes[0]}
      </div>
    </motion.div>
  );
}
