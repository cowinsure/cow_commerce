'use client';

import { cn } from '@/lib/theme/theme.config';
import type { Cow } from '@/lib/data/cows';

interface CowDescriptionProps {
  cow: Cow;
  className?: string;
}

export function CowDescription({ cow, className }: CowDescriptionProps) {
  return (
    <div className={cn('max-w-4xl', className)}>
      <h2 className="text-3xl font-extrabold tracking-tight mb-8">Asset Description</h2>
      <div className="text-on-surface-variant font-medium leading-relaxed space-y-6">
        {cow.description.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {/* Detailed Specs - 3 Columns */}
      <div className="grid grid-cols-3 gap-12 mt-12">
        {/* Genetic Profile */}
        <div className="space-y-4">
          <h4 className="font-bold border-b border-primary/10 pb-2">Genetic Profile</h4>
          <ul className="text-sm space-y-2 text-on-surface-variant">
            <li className="flex justify-between">
              <span>Genotype</span>
              <span className="font-bold text-on-surface">{cow.genetics.genotype}</span>
            </li>
            <li className="flex justify-between">
              <span>Bloodline</span>
              <span className="font-bold text-on-surface">{cow.genetics.bloodline}</span>
            </li>
            <li className="flex justify-between">
              <span>Heritability</span>
              <span className="font-bold text-on-surface">{cow.genetics.heritability}</span>
            </li>
          </ul>
        </div>

        {/* Health Record */}
        <div className="space-y-4">
          <h4 className="font-bold border-b border-primary/10 pb-2">Health Record</h4>
          <ul className="text-sm space-y-2 text-on-surface-variant">
            <li className="flex justify-between">
              <span>Vaccinations</span>
              <span className="font-bold text-on-surface">{cow.health.vaccinations}</span>
            </li>
            <li className="flex justify-between">
              <span>Dietary</span>
              <span className="font-bold text-on-surface">{cow.health.diet}</span>
            </li>
            <li className="flex justify-between">
              <span>Checkup</span>
              <span className="font-bold text-on-surface">{cow.health.checkup}</span>
            </li>
          </ul>
        </div>

        {/* Logistics */}
        <div className="space-y-4">
          <h4 className="font-bold border-b border-primary/10 pb-2">Logistics</h4>
          <ul className="text-sm space-y-2 text-on-surface-variant">
            <li className="flex justify-between">
              <span>Location</span>
              <span className="font-bold text-on-surface">{cow.logistics.location}</span>
            </li>
            <li className="flex justify-between">
              <span>Transit</span>
              <span className="font-bold text-on-surface">{cow.logistics.transit}</span>
            </li>
            <li className="flex justify-between">
              <span>Handling</span>
              <span className="font-bold text-on-surface">{cow.logistics.handling}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}