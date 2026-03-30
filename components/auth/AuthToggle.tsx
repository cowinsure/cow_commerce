'use client';

import { cn } from '@/lib/theme/theme.config';

interface AuthToggleProps {
  mode: 'login' | 'signup';
  onToggle: (mode: 'login' | 'signup') => void;
  className?: string;
}

export function AuthToggle({ mode, onToggle, className }: AuthToggleProps) {
  return (
    <div className={cn('inline-flex p-1 bg-surface-container-high rounded-full w-full', className)}>
      <button
        type="button"
        onClick={() => onToggle('login')}
        className={cn(
          'flex-1 py-2.5 px-6 rounded-full text-sm font-semibold transition-all',
          mode === 'login'
            ? 'bg-surface-container-lowest text-primary shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        )}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onToggle('signup')}
        className={cn(
          'flex-1 py-2.5 px-6 rounded-full text-sm font-semibold transition-all',
          mode === 'signup'
            ? 'bg-surface-container-lowest text-primary shadow-sm'
            : 'text-on-surface-variant hover:text-primary'
        )}
      >
        Create Account
      </button>
    </div>
  );
}