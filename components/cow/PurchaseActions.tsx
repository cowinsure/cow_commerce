// 'use client';

// import { useState } from 'react';
// import { cn } from '@/lib/theme/theme.config';
// import { useToast } from '@/components/ui/Toast';
// import type { Cow } from '@/lib/data/cows';

// interface PurchaseActionsProps {
//   cow: Cow;
//   quantity: number;
//   className?: string;
// }

// export function PurchaseActions({ cow, quantity, className }: PurchaseActionsProps) {
//   const [isPurchasing, setIsPurchasing] = useState(false);
//   const [isWatching, setIsWatching] = useState(false);
//   const { showToast } = useToast();

//   const handlePurchase = async () => {
//     if (quantity > cow.availableUnits) {
//       showToast('Selected quantity exceeds available units', 'error');
//       return;
//     }

//     setIsPurchasing(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setIsPurchasing(false);
//     showToast(`Successfully purchased ${quantity} unit(s) of ${cow.name}`, 'success');
//   };

//   const handleWatchlist = async () => {
//     setIsWatching(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     setIsWatching(false);
//     showToast(`${cow.name} added to your watchlist`, 'success');
//   };

//   const isDisabled = quantity > cow.availableUnits;

//   return (
//     <div className={cn('space-y-4', className)}>
//       <button
//         onClick={handlePurchase}
//         disabled={isPurchasing || isDisabled}
//         className={cn(
//           'w-full py-5 bg-primary text-on-primary rounded-full font-bold text-lg',
//           'shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all',
//           'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
//           'flex items-center justify-center gap-2'
//         )}
//       >
//         {isPurchasing ? (
//           <>
//             <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//             </svg>
//             <span>Processing...</span>
//           </>
//         ) : (
//           <>
//             <span>Purchase Units</span>
//             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//           </>
//         )}
//       </button>
//       <button
//         onClick={handleWatchlist}
//         disabled={isWatching}
//         className={cn(
//           'w-full py-4 bg-transparent border-2 border-primary/20 text-primary rounded-full font-bold text-sm',
//           'hover:bg-primary/5 transition-all',
//           'disabled:cursor-not-allowed disabled:opacity-50',
//           'flex items-center justify-center gap-2'
//         )}
//       >
//         {isWatching ? (
//           <>
//             <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//             </svg>
//             <span>Adding...</span>
//           </>
//         ) : (
//           <>
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//             </svg>
//             <span>Add to Watchlist</span>
//           </>
//         )}
//       </button>
//     </div>
//   );
// }