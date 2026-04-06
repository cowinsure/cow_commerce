"use client"
import { FilterSidebar } from "@/components/home/FilterSidebar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import useProduct from "@/hooks/product/useProduct";
import React, { useEffect } from "react";

const MarketPlacePage = () => {
  const { products, fetchProducts } = useProduct();
  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="pt-24 pb-20 flex-1">
      <HeroSection />
      <section className="px-6 md:px-8 md:max-w-screen-2xl mx-auto grid md:grid-cols-12 md:gap-12">
        <FilterSidebar />
        <ProductGrid cows={products} />
      </section>
    </div>
  );
};

export default MarketPlacePage;
