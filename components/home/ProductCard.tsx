'use client';

import Image from 'next/image';
import { cn } from '@/lib/theme/theme.config';
import type { Cow } from '@/lib/data/cows';

interface ProductCardProps {
  cow: Cow;
  className?: string;
}

const tagStyles = {
  primary: 'bg-primary text-on-primary',
  'primary-fixed': 'bg-primary-fixed text-on-primary-fixed',
  tertiary: 'bg-tertiary text-on-tertiary',
};

export function ProductCard({ cow, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col rounded-xl overflow-hidden bg-surface-container-low',
        'transition-all hover:translate-y-[-4px]',
        className
      )}
    >
      {/* Image Section */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          alt={cow.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={cow.image}
        />
        {/* Tag Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            'text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest',
            tagStyles[cow.tagColor]
          )}>
            {cow.tag} Grade
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-surface-container-lowest flex-1 border-t border-outline-variant/10">
        {/* Header: Name and Price */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold font-headline mb-1">{cow.name}</h3>
            <span className="text-xs font-medium text-outline uppercase tracking-wider">{cow.breed}</span>
          </div>
          <div className="text-right">
            <span className="block text-xl font-black text-primary">${cow.price.toLocaleString()}</span>
            <span className="text-[10px] text-outline font-bold uppercase">per unit</span>
          </div>
        </div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 gap-y-3 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="text-sm font-medium">{cow.weight} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">{cow.age} Months</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-sm font-medium">{cow.availableUnits} Available</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium">{cow.certification}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-full font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
          Purchase Units
        </button>
      </div>
    </div>
  );
}