'use client';

import { useState } from 'react';
import { cn } from '@/lib/theme/theme.config';

interface ShippingFormData {
  fullName: string;
  farmName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

interface ShippingFormProps {
  onSubmit?: (data: ShippingFormData) => void;
  className?: string;
}

export function ShippingForm({ onSubmit, className }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: '',
    farmName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const inputClass = 'w-full bg-surface-container-highest border-0 border-b-2 border-outline px-4 py-3 focus:ring-0 focus:border-primary transition-colors font-body';
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1 mb-2';

  return (
    <section className={cn('', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 21V7L12 3L5 7V21L12 17L19 21ZM12 5.5L17 7.8V11H7V7.8L12 5.5ZM5 13V19H7V13H5ZM17 13V19H19V13H17ZM12 12.5C12.55 12.5 13 12.95 13 13.5C13 14.05 12.55 14.5 12 14.5C11.45 14.5 11 14.05 11 13.5C11 12.95 11.45 12.5 12 12.5Z" />
        </svg>
        <h2 className="font-headline text-xl font-bold">Delivery Destination</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Johnathan Sterling"
          />
        </div>

        {/* Farm / Company Name */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="farmName">Farm / Company Name</label>
          <input
            id="farmName"
            name="farmName"
            type="text"
            value={formData.farmName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Sterling Acres Ltd."
          />
        </div>

        {/* Street Address */}
        <div className="md:col-span-2 space-y-2">
          <label className={labelClass} htmlFor="streetAddress">Street Address</label>
          <input
            id="streetAddress"
            name="streetAddress"
            type="text"
            value={formData.streetAddress}
            onChange={handleChange}
            className={inputClass}
            placeholder="842 High Plains Road"
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
            placeholder="Bozeman"
          />
        </div>

        {/* State & Zip Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelClass} htmlFor="state">State</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
              placeholder="MT"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass} htmlFor="zip">Zip</label>
            <input
              id="zip"
              name="zip"
              type="text"
              value={formData.zip}
              onChange={handleChange}
              className={inputClass}
              placeholder="59715"
            />
          </div>
        </div>
      </form>
    </section>
  );
}