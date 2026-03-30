'use client';

import { cn } from '@/lib/theme/theme.config';

interface MarketInsightCardProps {
  insight: string;
  className?: string;
}

export function MarketInsightCard({ insight, className }: MarketInsightCardProps) {
  return (
    <div className={cn('p-6 bg-tertiary-fixed rounded-xl border border-tertiary-container/10', className)}>
      <div className="flex items-start gap-4">
        <svg className="w-5 h-5 text-tertiary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <div>
          <h4 className="font-headline font-bold text-on-tertiary-fixed text-sm">Market Insight</h4>
          <p className="text-xs text-on-tertiary-fixed-variant mt-1 leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
}