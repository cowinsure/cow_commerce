"use client";

import { useEffect } from "react";
import { CowBodyDiagram } from "@/components/home/CowBodyDiagram";
import { QualityHealthSection } from "@/components/home/QualityHealthSection";
import { BestSellingCategories } from "@/components/home/BestSellingCategories";
import { ProductGrid } from "@/components/home/ProductGrid";
import { HomeHero } from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import FAQAccordion from "@/components/home/FAQAccordion";
import useProduct from "@/hooks/product/useProduct";
import { useLocalization } from "@/context/LocalizationContext";

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useProduct();
  // console.log(products);
  const { locale } = useLocalization();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen flex flex-col" lang={locale === "bn" ? "bn" : "en"}>
      <main className="pb-20 flex-1">
        <HomeHero />
        <section className="px-6 lg:px-8 lg:max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12">
          <ProductGrid cows={products} />
        </section>
        <HowItWorks />
        {/* <BestSellingCategories /> */}
        <CowBodyDiagram />
        <FAQAccordion />
        {/* <QualityHealthSection /> */}
      </main>
    </div>
  );
}
