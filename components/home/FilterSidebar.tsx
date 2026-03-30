'use client';

import { useState } from 'react';
import { cn } from '@/lib/theme/theme.config';
import { MarketInsights } from './MarketInsights';

interface FilterSidebarProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  breeds: string[];
  weightClass: string;
}

const breedOptions = [
  { id: 'angus', name: 'Angus Onyx', checked: true },
  { id: 'wagyu', name: 'Wagyu Heritage', checked: false },
  { id: 'hereford', name: 'Hereford Prime', checked: false },
];

const weightClasses = [
  { id: '400-600', label: '400 - 600' },
  { id: '600-800', label: '600 - 800' },
  { id: '800-1000', label: '800 - 1000' },
  { id: '1000+', label: '1000+' },
];

export function FilterSidebar({ className, onFilterChange }: FilterSidebarProps) {
  const [breeds, setBreeds] = useState(breedOptions.map((b) => ({ ...b })));
  const [selectedWeight, setSelectedWeight] = useState('600-800');

  const toggleBreed = (id: string) => {
    const updated = breeds.map((b) =>
      b.id === id ? { ...b, checked: !b.checked } : b
    );
    setBreeds(updated);
    onFilterChange?.({
      breeds: updated.filter((b) => b.checked).map((b) => b.id),
      weightClass: selectedWeight,
    });
  };

  const selectWeight = (id: string) => {
    setSelectedWeight(id);
    onFilterChange?.({
      breeds: breeds.filter((b) => b.checked).map((b) => b.id),
      weightClass: id,
    });
  };

  return (
    <aside className={cn('col-span-3 space-y-10', className)}>
      {/* Filter Section */}
      <div>
        <h3 className="font-headline text-lg font-bold mb-6 flex items-center gap-2">
          <svg className="material-symbols-outlined text-primary w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Refine Results
        </h3>

        <div className="space-y-8">
          {/* Breed Filter */}
          <div className="space-y-4">
            <label className="font-headline text-xs font-bold text-outline uppercase tracking-widest">
              Breed Type
            </label>
            <div className="flex flex-col gap-3">
              {breeds.map((breed) => (
                <label key={breed.id} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                      breed.checked
                        ? 'border-primary bg-primary'
                        : 'border-outline-variant group-hover:border-primary'
                    )}
                    onClick={() => toggleBreed(breed.id)}
                  >
                    {breed.checked && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={breed.checked}
                    onChange={() => toggleBreed(breed.id)}
                  />
                  <span className="text-sm font-medium text-on-surface-variant">{breed.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Age Range Slider */}
          <div className="space-y-4">
            <label className="font-headline text-xs font-bold text-outline uppercase tracking-widest">
              Age Range (Months)
            </label>
            <div className="pt-4 px-2">
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full relative">
                <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full" />
                <div className="absolute left-1/4 -top-1.5 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm" />
                <div className="absolute right-1/4 -top-1.5 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm" />
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant">
                <span>12M</span>
                <span>36M</span>
              </div>
            </div>
          </div>

          {/* Weight Class Filter */}
          <div className="space-y-4">
            <label className="font-headline text-xs font-bold text-outline uppercase tracking-widest">
              Weight Class (KG)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {weightClasses.map((wc) => (
                <button
                  key={wc.id}
                  onClick={() => selectWeight(wc.id)}
                  className={cn(
                    'py-2 px-3 text-xs font-bold rounded-lg transition-all',
                    selectedWeight === wc.id
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low border border-transparent hover:border-primary'
                  )}
                >
                  {wc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Insights Card */}
      <MarketInsights />
    </aside>
  );
}