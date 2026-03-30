'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/theme/theme.config';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  children?: ReactNode;
  className?: string;
}

export function AuthHeader({ title, subtitle, showLogo = true, children, className }: AuthHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      {/* Logo - hidden on desktop since it's in the left panel */}
      {showLogo && (
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <span className="font-headline text-xl font-extrabold tracking-tighter text-primary">
            The Digital Agrarian
          </span>
        </div>
      )}
      
      {/* Title */}
      <h3 className="font-headline text-3xl font-bold text-on-surface mb-3 tracking-tight">
        {title}
      </h3>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="text-on-surface-variant mb-8">
          {subtitle}
        </p>
      )}
      
      {/* Additional content */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}