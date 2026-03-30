'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CowGallery } from '@/components/cow/CowGallery';
import { CowInfo } from '@/components/cow/CowInfo';
import { Breadcrumb } from '@/components/cow/Breadcrumb';
import { CowDescription } from '@/components/cow/CowDescription';
import { getCowById } from '@/lib/data/cows';

export default function CowDetailsPage() {
  const params = useParams();
  const cowId = params.id as string;
  const cow = getCowById(cowId);
  const [quantity, setQuantity] = useState(1);
  
  const totalPrice = useMemo(() => {
    return cow ? cow.price * quantity : 0;
  }, [cow, quantity]);

  if (!cow) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-on-surface mb-4">Cow Not Found</h1>
            <p className="text-on-surface-variant">The requested cow details could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Marketplace', href: '/' },
    { label: cow.breed.split(' ')[0], href: '/' },
    { label: cow.name },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        {/* Breadcrumb */}
        <div className="px-8 max-w-screen-2xl mx-auto mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Main Content - 2 Column Grid */}
        <div className="px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Gallery (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="relative z-0">
                <CowGallery cow={cow} />
              </div>
            </div>

            {/* Right Column - Info (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="relative z-10">
                <CowInfo
                  cow={cow}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 pt-16 border-t border-outline-variant/20">
          <div className="px-8 max-w-screen-2xl mx-auto">
            <CowDescription cow={cow} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}