"use client";

import { cn } from "@/lib/theme/theme.config";
import { PaymentType } from "@/lib/models/paymentTypeDTO";
import { Banknote, Landmark, CreditCard, Check } from "lucide-react";

interface PaymentOptionsProps {
  paymentTypes: PaymentType[];
  value: {
    paymentType: PaymentType | null;
    referenceNo: string;
    imageFile: File | null;
    imagePreview?: string;
  };
  onChange: (val: PaymentOptionsProps["value"]) => void;
  className?: string;
}

export function PaymentOptions({
  paymentTypes,
  value,
  onChange,
  className,
}: PaymentOptionsProps) {
  const handleSelect = (method: PaymentType) => {
    onChange({ ...value, paymentType: method });
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, referenceNo: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    // Create object URL for preview
    const imagePreview = file ? URL.createObjectURL(file) : undefined;
    onChange({ ...value, imageFile: file, imagePreview });
  };

  // HELPER FUNCTIONS
  const getPaymentIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("cash")) return Banknote;
    if (lowerName.includes("bank")) return Landmark;
    if (lowerName.includes("credit")) return CreditCard;
    return Banknote;
  };

  const formatPaymentName = (name: string) =>
    name.replace(/\bSale\b/g, "Payment").replace(/\s*\(.*?\)/g, "");

  const getIconColors = (name: string, isSelected: boolean) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("cash")) {
      return isSelected
        ? "bg-emerald-100 text-emerald-700"
        : "bg-emerald-50 text-emerald-600";
    }
    if (lowerName.includes("bank")) {
      return isSelected
        ? "bg-blue-100 text-blue-700"
        : "bg-blue-50 text-blue-600";
    }
    if (lowerName.includes("credit")) {
      return isSelected
        ? "bg-violet-100 text-violet-700"
        : "bg-violet-50 text-violet-600";
    }
    return isSelected
      ? "bg-slate-100 text-slate-700"
      : "bg-slate-50 text-slate-600";
  };

  return (
    <section className={cn("space-y-6", className)}>
      {/* Payment Type Selection - Modern Card Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {paymentTypes.map((method) => {
          const isSelected =
            value.paymentType?.payment_type_id === method.payment_type_id;

          const displayName = formatPaymentName(method.payment_type_name);
          const Icon = getPaymentIcon(method.payment_type_name);
          const iconColors = getIconColors(
            method.payment_type_name,
            isSelected,
          );

          return (
            <button
              key={method.payment_type_id}
              onClick={() => handleSelect(method)}
              className={cn(
                "group relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300",
                isSelected
                  ? "border-emerald-400 bg-emerald-50 shadow-lg shadow-primary/10"
                  : "border-transparent bg-gray-50 hover:border-outline-variant hover:shadow-md",
              )}
            >
              {/* Check indicator for selected state */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-on-primary" strokeWidth={3} />
                </div>
              )}

              {/* Icon container */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  iconColors,
                  isSelected && "scale-110",
                )}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-sm font-semibold transition-colors",
                  isSelected ? "text-primary" : "text-on-surface-variant",
                )}
              >
                {displayName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fields container - shows when a payment type is selected */}
      {value.paymentType && (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Reference Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface">
              Reference / Transaction ID
            </label>
            <input
              type="text"
              value={value.referenceNo}
              onChange={handleReferenceChange}
              placeholder="Enter transaction reference"
              className="w-full px-4 py-3.5 bg-gray-50 border border-outline-variant/20 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>

          {/* Image Upload with Preview */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface">
              Payment Proof
            </label>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer peer"
              />

              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed transition-all",
                  value.imageFile
                    ? "border-primary bg-primary/5"
                    : "border-outline-variant/30 hover:border-primary hover:bg-surface-container",
                )}
              >
                {value.imageFile ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-primary w-20 truncate">
                          {value.imageFile.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Click to change file
                        </p>
                      </div>
                    </div>
                    {/* Image Preview - Shows on left side when file is selected */}
                    {value.imagePreview && (
                      <div className=" p-2 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img
                          src={value.imagePreview}
                          alt="Payment proof preview"
                          className="w-30 h-32 object-contain rounded-lg border border-gray-400"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-on-surface-variant"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-on-surface">
                        Tap to upload proof
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Screenshot, receipt image
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
