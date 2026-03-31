"use client";

import { CowBodyDiagram } from "@/components/home/CowBodyDiagram";
import { QualityHealthSection } from "@/components/home/QualityHealthSection";
import { BestSellingCategories } from "@/components/home/BestSellingCategories";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Footer } from "@/components/home/Footer";
import { cows } from "@/lib/data/cows";
import { HomeHero } from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="pb-20 flex-1">
        <HomeHero />
        <section className="px-8 max-w-screen-2xl mx-auto grid grid-cols-12 gap-12">
          {/* <FilterSidebar /> */}
          <ProductGrid cows={cows} />
        </section>
        <HowItWorks />
        <BestSellingCategories />
        <CowBodyDiagram />
        <QualityHealthSection />
      </main>
      <Footer />
    </div>
  );
}
