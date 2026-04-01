'use client';

import { useState } from 'react';
import { cn } from '@/lib/theme/theme.config';

type PaymentMethod = 'card' | 'wire';

interface PaymentOptionsProps {
  onChange?: (method: PaymentMethod) => void;
  className?: string;
}

export function PaymentOptions({ onChange, className }: PaymentOptionsProps) {
  const [selected, setSelected] = useState<PaymentMethod>('card');

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method);
    onChange?.(method);
  };

  return (
    <section className={cn('', className)}>

      <div className="space-y-4">
        {/* Credit Card Option */}
        <label
          className={cn(
            'relative flex items-center p-6 cursor-pointer rounded-xl transition-all',
            'bg-white border-2 border-gray-300 hover:border-green-950/80 hover:shadow-sm',
            selected === 'card' && 'border-green-950/80 ring-4 ring-green-600/20'
          )}
        >
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected === 'card' ? "border-green-950/80 bg-green-950/80" : "border-gray-300"
          )}>
            {selected === 'card' && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selected === 'card'}
            onChange={() => handleSelect('card')}
            className="sr-only"
          />
          <div className="ml-4 flex-1">
            <span className="block font-headline font-bold text-on-surface">Credit / Debit Card</span>
            <span className="block text-sm text-on-surface-variant">Secure instant processing via Stripe</span>
          </div>
          <svg className="w-6 h-6 text-outline" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        </label>

        {/* Wire Transfer Option */}
        <label
          className={cn(
            'relative flex items-center p-6 cursor-pointer rounded-xl transition-all',
            'bg-white border-2 border-gray-300 hover:border-green-950/80 hover:shadow-sm',
            selected === 'wire' && 'border-green-950/80 ring-4 ring-green-600/20'
          )}
        >
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected === 'wire' ? "border-green-950/80 bg-green-950/80" : "border-gray-300"
          )}>
            {selected === 'wire' && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <input
            type="radio"
            name="payment"
            value="wire"
            checked={selected === 'wire'}
            onChange={() => handleSelect('wire')}
            className="sr-only"
          />
          <div className="ml-4 flex-1">
            <span className="block font-headline font-bold text-on-surface">Wire Transfer</span>
            <span className="block text-sm text-on-surface-variant">Recommended for high-value transactions over $10,000</span>
          </div>
          <svg className="w-6 h-6 text-outline" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 10V7h3V4h5v3h3v3h-3v7H7v-7H4zm3 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
          </svg>
        </label>
      </div>
    </section>
  );
}