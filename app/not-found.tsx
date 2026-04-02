'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Sprout, Search } from 'lucide-react';
import { cn } from '@/lib/theme/theme.config';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-zinc-950 flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg w-full text-center"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mb-8"
          >
            <span className="text-[150px] sm:text-[180px] font-bold text-emerald-100 dark:text-emerald-900 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full shadow-xl shadow-emerald-900/10 flex items-center justify-center">
                <Sprout className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-emerald-900 dark:text-emerald-100 mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg"
          >
            Oops! The page you&apos;re looking for seems to have wandered off like a lost cow. 
            Let&apos;s get you back on track.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className={cn(
                'inline-flex items-center justify-center gap-2 px-6 py-3',
                'bg-emerald-700 text-white rounded-full font-semibold text-sm',
                'hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20',
                'active:scale-95 transition-all duration-200'
              )}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>

            <Link
              href="/marketplace"
              className={cn(
                'inline-flex items-center justify-center gap-2 px-6 py-3',
                'bg-white dark:bg-zinc-800 text-emerald-900 dark:text-emerald-100',
                'rounded-full font-semibold text-sm border border-emerald-200 dark:border-emerald-800',
                'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
                'active:scale-95 transition-all duration-200'
              )}
            >
              <Search className="w-4 h-4" />
              Browse Marketplace
            </Link>
          </motion.div>

          {/* Go Back Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => window.history.back()}
            className={cn(
              'mt-6 inline-flex items-center justify-center gap-2 px-6 py-3',
              'text-zinc-600 dark:text-zinc-400 font-medium text-sm',
              'hover:text-emerald-700 dark:hover:text-emerald-300',
              'transition-colors duration-200'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Go back to previous page
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-emerald-100 dark:border-emerald-900/30">
        <div className="text-center">
          <span className="font-headline font-semibold text-emerald-800 dark:text-emerald-200 text-sm">
            The Digital Agrarian
          </span>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
            Your trusted cow commerce platform
          </p>
        </div>
      </footer>
    </div>
  );
}
