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
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
        <h2 className="font-headline text-xl font-bold">Payment Method</h2>
      </div>

      <div className="space-y-4">
        {/* Credit Card Option */}
        <label
          className={cn(
            'relative flex items-center p-6 cursor-pointer rounded-xl transition-all',
            'bg-surface-container-low hover:bg-surface-container',
            selected === 'card' && 'bg-surface-container ring-2 ring-primary'
          )}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selected === 'card'}
            onChange={() => handleSelect('card')}
            className="w-5 h-5 text-primary border-outline-variant focus:ring-offset-0 focus:ring-0"
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
            'bg-surface-container-low hover:bg-surface-container',
            selected === 'wire' && 'bg-surface-container ring-2 ring-primary'
          )}
        >
          <input
            type="radio"
            name="payment"
            value="wire"
            checked={selected === 'wire'}
            onChange={() => handleSelect('wire')}
            className="w-5 h-5 text-primary border-outline-variant focus:ring-offset-0 focus:ring-0"
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