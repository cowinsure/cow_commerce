// 'use client';

// import { cn } from '@/lib/theme/theme.config';
// import type { Cow } from '@/lib/data/cows';
// import { QuantitySelector } from './QuantitySelector';
// import { PurchaseActions } from './PurchaseActions';
// import { MarketInsightCard } from './MarketInsightCard';

// interface CowInfoProps {
//   cow: Cow;
//   quantity: number;
//   onQuantityChange: (quantity: number) => void;
//   className?: string;
// }

// export function CowInfo({ cow, quantity, onQuantityChange, className }: CowInfoProps) {
//   return (
//     <div className={cn('flex flex-col', className)}>
//       {/* Header */}
//       <div className="mb-2">
//         <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">{cow.breed}</span>
//         <h1 className="text-5xl font-extrabold tracking-tighter mt-2">{cow.name}</h1>
//       </div>

//       {/* Price */}
//       <div className="flex items-baseline gap-3 mt-4 mb-8">
//         <span className="text-4xl font-black text-primary">${cow.price.toLocaleString()}</span>
//         <span className="text-sm font-bold text-outline uppercase">USD per unit</span>
//       </div>

//       {/* Purchase Card */}
//       <div className="bg-surface-container-low rounded-2xl p-8 space-y-8 border border-outline-variant/10">
//         {/* Specs Grid */}
//         <div className="grid grid-cols-2 gap-x-8 gap-y-6">
//           <SpecItem icon="weight" label="Weight Class" value={`${cow.weight} kg`} />
//           <SpecItem icon="calendar" label="Maturity" value={`${cow.age} Months`} />
//           <SpecItem icon="inventory" label="Availability" value={`${cow.availableUnits} Units`} />
//           <SpecItem icon="verified" label="Certification" value={cow.certification} />
//         </div>

//         {/* Quantity & Actions */}
//         <div className="pt-8 border-t border-outline-variant/20">
//           <QuantitySelector
//             quantity={quantity}
//             maxUnits={cow.availableUnits}
//             onChange={onQuantityChange}
//           />
//           <div className="mt-6">
//             <PurchaseActions
//               cow={cow}
//               quantity={quantity}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Market Insight */}
//       {cow.marketInsight && (
//         <div className="mt-8">
//           <MarketInsightCard insight={cow.marketInsight} />
//         </div>
//       )}
//     </div>
//   );
// }

// interface SpecItemProps {
//   icon: 'weight' | 'calendar' | 'inventory' | 'verified';
//   label: string;
//   value: string;
// }

// function SpecItem({ icon, label, value }: SpecItemProps) {
//   const icons = {
//     weight: (
//       <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
//       </svg>
//     ),
//     calendar: (
//       <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//     ),
//     inventory: (
//       <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//       </svg>
//     ),
//     verified: (
//       <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//       </svg>
//     ),
//   };

//   return (
//     <div className="flex flex-col gap-1">
//       <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{label}</span>
//       <div className="flex items-center gap-2">
//         {icons[icon]}
//         <span className="text-lg font-bold">{value}</span>
//       </div>
//     </div>
//   );
// }