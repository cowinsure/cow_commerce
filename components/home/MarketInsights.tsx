'use client';

import { cn } from '@/lib/theme/theme.config';

interface MarketInsightsProps {
  className?: string;
}

export function MarketInsights({ className }: MarketInsightsProps) {
  return (
    <div className={cn('p-6 bg-tertiary-fixed rounded-xl border border-tertiary-container/10', className)}>
      <h4 className="font-headline font-bold text-on-tertiary-fixed mb-2">Market Insights</h4>
      <p className="text-sm text-on-tertiary-fixed-variant mb-4">
        Wagyu pricing has increased by 12% this quarter.
      </p>
      <a className="text-xs font-bold underline text-on-tertiary-fixed" href="#">
        View full report
      </a>
    </div>
  );
}