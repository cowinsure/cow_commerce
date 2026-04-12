"use client";

import Image from "next/image";
import { cn } from "@/lib/theme/theme.config";
import { LivestockItem } from "@/lib/models/productDTO";

interface OrderItem {
  cow: LivestockItem;
  quantity: number;
}

interface OrderSummaryProps {
  item: OrderItem;
  logisticsFee?: number;
  className?: string;
}

export function OrderSummary({
  item,
  logisticsFee = 345,
  className,
}: OrderSummaryProps) {
  const { cow, quantity } = item;
  const unitPrice = cow.unit_price;
  const subtotal = unitPrice * quantity;
  const total = subtotal + logisticsFee;

  return (
    <div className={cn("", className)}>
      {/* Asset Card */}
      {/* <div className="flex gap-6 mb-8 p-4 bg-surface-container-low rounded-lg">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            alt={cow.name}
            className="w-full h-full object-cover"
            fill
            sizes="96px"
            src={cow.images[0] || cow.image}
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
            {cow.tag} Sire Lineage
          </span>
          <h4 className="font-headline font-bold text-lg leading-tight">{cow.name}</h4>
          <p className="text-sm text-on-surface-variant">
            {cow.certification} · DNA Verified
          </p>
        </div>
      </div> */}

      {/* Financial Details */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-on-surface-variant">Unit Booking</span>
          <span className="font-medium">
            ${unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-on-surface-variant">Quantity</span>
          <span className="font-medium">
            {String(quantity).padStart(2, "0")} Unit{quantity > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-on-surface-variant">Logistics & Insurance</span>
          <span className="font-medium">
            $
            {logisticsFee.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Total Booking
            </span>
            <span className="block font-headline text-3xl font-extrabold text-primary">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-on-primary-fixed-variant bg-primary-fixed px-2 py-1 rounded">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              SECURED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
