"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/theme/theme.config";
import { MarketInsights } from "./MarketInsights";
import {
  SlidersHorizontal,
  Check,
  ChevronDown,
  RotateCcw,
  Tag,
  Weight,
  Banknote,
} from "lucide-react";

interface FilterSidebarProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  breeds: string[];
  weightClass: string;
  minWeight?: number;
  maxWeight?: number;
  minPrice?: number;
  maxPrice?: number;
}

const breedOptions = [
  { id: "angus", name: "Angus Onyx", checked: true },
  { id: "wagyu", name: "Wagyu Heritage", checked: false },
  { id: "hereford", name: "Hereford Prime", checked: false },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function FilterSidebar({
  className,
  onFilterChange,
}: FilterSidebarProps) {
  const [breeds, setBreeds] = useState(breedOptions.map((b) => ({ ...b })));
  const [selectedWeight, setSelectedWeight] = useState("600-800");
  // Actual filter values for API
  const [priceRange, setPriceRange] = useState<[number | "", number | ""]>(["", ""]);
  const [weightRange, setWeightRange] = useState<[number | "", number | ""]>(["", ""]);
  const [expandedSections, setExpandedSections] = useState({
    breed: true,
    price: true,
    weight: true,
  });

  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounce effect - triggers on state changes with fresh values
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer - wait 800ms after user stops typing
    debounceTimer.current = setTimeout(() => {
      // Inject defaults only when calling API
      const minWeight = weightRange[0] === "" ? 0 : weightRange[0];
      const maxWeight = weightRange[1] === "" ? 1500 : weightRange[1];
      const minPrice = priceRange[0] === "" ? 0 : priceRange[0];
      const maxPrice = priceRange[1] === "" ? 50000000 : priceRange[1];

      // Ensure valid min/max order
      const finalMinWeight = Math.min(minWeight, maxWeight);
      const finalMaxWeight = Math.max(minWeight, maxWeight);
      const finalMinPrice = Math.min(minPrice, maxPrice);
      const finalMaxPrice = Math.max(minPrice, maxPrice);

      onFilterChange?.({
        breeds: breeds.filter((b) => b.checked).map((b) => b.id),
        weightClass: selectedWeight,
        minWeight: finalMinWeight,
        maxWeight: finalMaxWeight,
        minPrice: finalMinPrice,
        maxPrice: finalMaxPrice,
      });
    }, 800);

    // Cleanup timer on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [breeds, selectedWeight, weightRange, priceRange, onFilterChange]);

  // Calculate active filters count
  const activeFiltersCount =
    breeds.filter((b) => b.checked).length +
    (selectedWeight !== "all" ? 1 : 0) +
    (priceRange[0] !== "" || priceRange[1] !== "" ? 1 : 0);

  const toggleBreed = (id: string) => {
    const updated = breeds.map((b) =>
      b.id === id ? { ...b, checked: !b.checked } : b,
    );
    setBreeds(updated);
    // No need to call debounce - useEffect handles it
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setPriceRange(["", priceRange[1]]);
      return;
    }

    const numValue = Number(rawValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setPriceRange([numValue, priceRange[1]]);
    }
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setPriceRange([priceRange[0], ""]);
      return;
    }

    const numValue = Number(rawValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setPriceRange([priceRange[0], numValue]);
    }
  };

  const handleWeightMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setWeightRange(["", weightRange[1]]);
      return;
    }

    const numValue = Number(rawValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setWeightRange([numValue, weightRange[1]]);
    }
  };

  const handleWeightMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setWeightRange([weightRange[0], ""]);
      return;
    }

    const numValue = Number(rawValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setWeightRange([weightRange[0], numValue]);
    }
  };

  const resetFilters = () => {
    setBreeds(breedOptions.map((b) => ({ ...b, checked: false })));
    setSelectedWeight("400-600");
    setPriceRange(["", ""]);
    setWeightRange(["", ""]);
    // No need to call debounce - useEffect handles it
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("col-span-3 space-y-6", className)}
    >
      {/* Glassmorphism Filter Card */}
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/50">
        {/* Decorative gradient */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="">
                <h3 className="font-bold text-lg text-emerald-600">Filters</h3>
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                title="Reset Filters"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          {/* Breed Filter Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <button
              onClick={() => toggleSection("breed")}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span className="text-sm font-bold text-slate-700">
                  Breed Type
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-slate-400 transition-transform duration-300",
                  expandedSections.breed && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {expandedSections.breed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2">
                    {breeds.map((breed) => (
                      <motion.label
                        key={breed.id}
                        whileHover={{ x: 2 }}
                        className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group"
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
                            breed.checked
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-slate-300 group-hover:border-emerald-400",
                          )}
                          onClick={() => toggleBreed(breed.id)}
                        >
                          {breed.checked && (
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={breed.checked}
                          onChange={() => toggleBreed(breed.id)}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors",
                            breed.checked ? "text-slate-900" : "text-slate-600",
                          )}
                        >
                          {breed.name}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-6" />

          {/* Price Range Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span className="text-sm font-bold text-slate-700">
                  Price Range (BDT)
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-slate-400 transition-transform duration-300",
                  expandedSections.price && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {expandedSections.price && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className=""
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          ৳
                        </span>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={handlePriceMinChange}
                          className="w-full pl-6 pr-3 py-2.5 text-sm font-semibold bg-slate-50 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                          placeholder="e.g. 20000"
                        />
                      </div>
                      <span className="text-slate-400">-</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          ৳
                        </span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={handlePriceMaxChange}
                          className="w-full pl-6 pr-3 py-2.5 text-sm font-semibold bg-slate-50 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                          placeholder="e.g. 500000"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-6" />

          {/* Weight Class Section */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => toggleSection("weight")}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <span className="text-sm font-bold text-slate-700">
                  Weight (KG)
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-slate-400 transition-transform duration-300",
                  expandedSections.weight && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {expandedSections.weight && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className=""
                >
                  <div className="space-y-3">
                    {/* Custom Range */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={weightRange[0]}
                          onChange={handleWeightMinChange}
                          className="w-full px-3 py-2 text-sm font-semibold bg-slate-50 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                          placeholder="e.g. 200"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          kg
                        </span>
                      </div>
                      <span className="text-slate-400">-</span>
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={weightRange[1]}
                          onChange={handleWeightMaxChange}
                          className="w-full px-3 py-2 text-sm font-semibold bg-slate-50 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                          placeholder="e.g. 800"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          kg
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Market Insights Card */}
      {/* <MarketInsights /> */}
    </motion.aside>
  );
}
