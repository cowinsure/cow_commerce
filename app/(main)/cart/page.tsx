'use client';

import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { ShippingForm } from '@/components/cart/ShippingForm';
import { PaymentOptions } from '@/components/cart/PaymentOptions';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { TrustBadges } from '@/components/cart/TrustBadges';
import { cows } from '@/lib/data/cows';

export default function CartPage() {
  // Using first cow as demo item
  const cartItem = cows[0];
  
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      
      <main className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto flex-grow">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Secure Investment Checkout
          </h1>
          <p className="text-on-surface-variant font-body">
            Finalize your acquisition of premium Angus livestock.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-12">
            <ShippingForm />
            <PaymentOptions />
          </div>

          {/* Right Column: Order Summary (Sticky Sidebar) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-[0_40px_80px_-20px_rgba(23,28,31,0.04)]">
              <OrderSummary 
                item={{ 
                  cow: cartItem, 
                  quantity: 1 
                }} 
              />
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8">
              <TrustBadges />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}