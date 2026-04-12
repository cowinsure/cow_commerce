"use client";

import { cn } from "@/lib/theme/theme.config";
import InputField from "@/components/ui/InputField";

interface ShippingFormData {
  address: string;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ShippingFormData>>;
  className?: string;
}

export function ShippingForm({
  formData,
  setFormData,
  className,
}: ShippingFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className={cn("", className)}>
      {/* Full Name */}
      {/* <InputField
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Johnathan Sterling"
        /> */}

      {/* Farm / Company Name */}
      {/* <InputField
          id="farmName"
          name="farmName"
          type="text"
          label="Farm / Company Name"
          value={formData.farmName}
          onChange={handleChange}
          placeholder="Sterling Acres Ltd."
        /> */}

      {/* Street Address */}
      <div className="grid grid-cols-1 w-full gap-6">
        <div className="md:col-span-2">
          <InputField
            id="address"
            name="address"
            type="text"
            label="Enter You complete address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="House no, Block/Road, Area"
            className="h-25"
          />
        </div>
      </div>

      {/* City */}
      {/* <InputField
          id="city"
          name="city"
          type="text"
          label="City"
          value={formData.city}
          onChange={handleChange}
          placeholder="Bozeman"
        /> */}

      {/* State & Zip Row */}
      {/* <div className="grid grid-cols-2 gap-4">
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
        </div> */}
    </section>
  );
}
