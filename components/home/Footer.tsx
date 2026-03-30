'use client';

import { cn } from '@/lib/theme/theme.config';

export function Footer({ className }: { className?: string }) {
  const footerLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Contact Support', href: '#' },
  ];

  return (
    <footer className={cn('w-full mt-auto bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800', className)}>
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="mb-8 md:mb-0">
          <span className="font-headline font-semibold text-emerald-900 dark:text-emerald-100 text-lg">
            The Digital Agrarian
          </span>
          <p className="font-inter text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            © 2024 The Digital Agrarian. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 font-inter text-xs text-zinc-500 dark:text-zinc-400">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:underline decoration-emerald-500 underline-offset-4"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}