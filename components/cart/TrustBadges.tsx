'use client';

import { cn } from '@/lib/theme/theme.config';

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {/* SSL Encrypted */}
      <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
        <svg className="w-6 h-6 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-tight leading-tight">
          SSL Encrypted Transaction
        </span>
      </div>

      {/* Escrow Protected */}
      <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
        <svg className="w-6 h-6 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
        <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-tight leading-tight">
          Escrow Protected Funds
        </span>
      </div>
    </div>
  );
}