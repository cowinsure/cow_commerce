'use client';

import { Navbar } from '@/components/home/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterSidebar } from '@/components/home/FilterSidebar';
import { ProductGrid } from '@/components/home/ProductGrid';
import { Footer } from '@/components/home/Footer';
import { cows } from '@/lib/data/cows';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-24 pb-20 flex-1">
        <HeroSection />
        <section className="px-8 max-w-screen-2xl mx-auto grid grid-cols-12 gap-12">
          <FilterSidebar />
          <ProductGrid cows={cows} />
        </section>
      </main>
      <Footer />
    </div>
  );
}