"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/theme/theme.config";
import { ProductCard } from "./ProductCard";
import { usePathname } from "next/navigation";
import { LivestockItem } from "@/lib/models/productDTO";

interface ProductGridProps {
  cows: LivestockItem[];
  className?: string;
  loading?: boolean;
}

export function ProductGrid({ cows, className, loading }: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const pathname = usePathname();

  const isHome = pathname === "/";

  const visibleCows = useMemo(() => {
    return cows.slice(0, visibleCount);
  }, [cows, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, cows.length));
  };

  const hasMore = visibleCount < cows.length;

  return (
    <div
      className={cn(
        `${isHome ? "col-span-8 lg:col-span-16 mt-32 mb-20" : "col-span-9"}`,
        className,
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Available Assets
          </h2>
          <p className="text-on-surface-variant font-medium">
            Showing {visibleCows.length} of {cows.length} elite specimens
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "grid"
                ? "bg-surface-container-highest text-primary"
                : "bg-surface-container hover:bg-surface-container-high text-outline",
            )}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "list"
                ? "bg-surface-container-highest text-primary"
                : "bg-surface-container hover:bg-surface-container-high text-outline",
            )}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm font-medium text-outline">Loading premium assets...</p>
        </div>
      ) : visibleCows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-16 h-16 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-lg font-bold text-on-surface">No Assets Found</p>
          <p className="mt-2 text-sm text-outline">Try adjusting your filters to find more results</p>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-8",
            viewMode === "grid"
              ? `${isHome ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`
              : "grid-cols-1",
          )}
        >
          {visibleCows.map((cow) => (
            <ProductCard key={cow.id} cow={cow} />
          ))}
        </div>
      )}

      {/* Load More */}
      {!loading && hasMore && (
        <div className="mt-16 flex flex-col items-center">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 px-10 py-4 bg-surface-container text-primary rounded-full font-bold hover:bg-surface-container-high transition-all"
          >
            Load More Curated Assets
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <p className="mt-4 text-xs font-bold text-outline uppercase tracking-widest">
            Viewing {visibleCount} of {cows.length} Assets
          </p>
        </div>
      )}
    </div>
  );
}
