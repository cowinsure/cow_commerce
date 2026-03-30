'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/theme/theme.config';

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex items-stretch">
      {/* Left Side: Visual/Pastoral Side */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <Image
          alt="The Digital Agrarian Pastoral Landscape"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
          fill
          priority
          sizes="50vw"
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80"
        />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div>
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-primary">
              The Digital Agrarian
            </h1>
          </div>
          
          <div className="max-w-md">
            <div className="mb-8 h-1 w-12 bg-primary-fixed" />
            <h2 className="font-headline text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Cultivating the future of livestock commerce.
            </h2>
            <p className="text-primary-fixed text-lg leading-relaxed font-medium">
              Join an elite network of producers and buyers. Managing your ranch's digital footprint has never been this seamless.
            </p>
          </div>
          
          <div className="flex items-center gap-8 text-white/60 font-medium text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-fixed" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Verified Assets
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-fixed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure Auctions
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-fixed" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Real-time Data
            </span>
          </div>
        </div>
        
        {/* Asymmetric Glass Decorative Element */}
        <div className="absolute -right-20 top-1/4 w-64 h-96 bg-white/20 backdrop-blur-xl rounded-full rotate-12 opacity-20" />
      </section>

      {/* Right Side: Auth Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-surface">
        <div className={cn('w-full max-w-[440px]', className)}>
          {children}
        </div>
      </section>
    </main>
  );
}