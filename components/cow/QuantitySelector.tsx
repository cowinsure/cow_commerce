'use client';

import { cn } from '@/lib/theme/theme.config';

interface QuantitySelectorProps {
  quantity: number;
  maxUnits: number;
  onChange: (quantity: number) => void;
  className?: string;
}

export function QuantitySelector({ quantity, maxUnits, onChange, className }: QuantitySelectorProps) {
  const decrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < maxUnits) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className={cn('flex gap-4 items-center', className)}>
      <div className="flex-1">
        <label className="block text-[10px] font-bold text-outline uppercase tracking-widest mb-2">
          Quantity Selection
        </label>
        <div className="flex items-center bg-white rounded-full border border-outline-variant/30 px-2 py-1">
          <button
            onClick={decrement}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            className="w-full text-center border-none focus:ring-0 font-bold text-lg bg-transparent"
            type="number"
            value={quantity}
            readOnly
            min={1}
            max={maxUnits}
          />
          <button
            onClick={increment}
            disabled={quantity >= maxUnits}
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}