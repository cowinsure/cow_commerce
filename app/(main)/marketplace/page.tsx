import { FilterSidebar } from "@/components/home/FilterSidebar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import React from "react";
import { cows } from "@/lib/data/cows";

const page = () => {
  return (
    <div className="pt-24 pb-20 flex-1">
      <HeroSection />
      <section className="px-8 max-w-screen-2xl mx-auto grid grid-cols-12 gap-12">
        <FilterSidebar />
        <ProductGrid cows={cows} />
      </section>
    </div>
  );
};

export default page;
