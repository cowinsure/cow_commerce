'use client';

import { useState } from 'react';
import { cn } from '@/lib/theme/theme.config';
import InputField from '@/components/ui/InputField';

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

  return (
    <section className={cn('', className)}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <InputField
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Johnathan Sterling"
        />

        {/* Farm / Company Name */}
        <InputField
          id="farmName"
          name="farmName"
          type="text"
          label="Farm / Company Name"
          value={formData.farmName}
          onChange={handleChange}
          placeholder="Sterling Acres Ltd."
        />

        {/* Street Address */}
        <div className="md:col-span-2">
          <InputField
            id="streetAddress"
            name="streetAddress"
            type="text"
            label="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="842 High Plains Road"
          />
        </div>

        {/* City */}
        <InputField
          id="city"
          name="city"
          type="text"
          label="City"
          value={formData.city}
          onChange={handleChange}
          placeholder="Bozeman"
        />

        {/* State & Zip Row */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="state"
            name="state"
            type="text"
            label="State"
            value={formData.state}
            onChange={handleChange}
            placeholder="MT"
          />
          <InputField
            id="zip"
            name="zip"
            type="text"
            label="Zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="59715"
          />
        </div>
      </form>
    </section>
  );
}