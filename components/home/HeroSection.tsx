'use client';

import Image from 'next/image';
import { cn } from '@/lib/theme/theme.config';

export function HeroSection({ className }: { className?: string }) {
  return (
    <header className={cn('relative px-8 max-w-screen-2xl mx-auto mb-16', className)}>
      <div className="relative h-[480px] w-full rounded-xl overflow-hidden bg-primary-container flex items-center px-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            alt="Cattle grazing in misty meadow"
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 to-primary-container/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <span className="text-primary-fixed font-semibold tracking-widest text-xs uppercase mb-4 block">
            Curated Listings
          </span>
          <h1 className="text-white text-6xl font-extrabold tracking-tighter mb-6 leading-none">
            Prime Cattle Selection
          </h1>
          <p className="text-on-primary-container text-lg max-w-lg mb-8 font-medium leading-relaxed">
            Experience the next generation of livestock procurement. Precision-bred assets for the discerning digital producer.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-primary-fixed text-on-primary-fixed rounded-full font-bold transition-transform hover:scale-105 active:scale-95">
              Browse Inventory
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-all">
              View Trends
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}