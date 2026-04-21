"use client"
import { FilterSidebar, FilterState } from "@/components/home/FilterSidebar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import useProduct from "@/hooks/product/useProduct";
import React, { useEffect, useCallback, useState } from "react";

const MarketPlacePage = () => {
  const { products, fetchProducts, loading } = useProduct();
  const [filters, setFilters] = useState<FilterState | null>(null);

  // Fetch products when filters change
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    fetchProducts({
      minWeight: newFilters.minWeight,
      maxWeight: newFilters.maxWeight,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
      breeds: newFilters.breeds,
    });
  }, [fetchProducts]);

  // Initial fetch on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // console.log("Products:", products);
  // console.log("Loading:", loading);

  return (
    <div className="pt-24 pb-20 flex-1">
      <HeroSection />
      <section className="px-6 md:px-8 md:max-w-screen-2xl mx-auto grid md:grid-cols-12 md:gap-12">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <ProductGrid cows={products} loading={loading} />
      </section>
    </div>
  );
};

export default MarketPlacePage;
