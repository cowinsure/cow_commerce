"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOrderContext } from "@/context/OrderContext";
import { getStatusBadge } from "@/app/(main)/order-history/page";

export default function BellNotification() {
  const [open, setOpen] = useState(false);
  const { unpaidOrders, unpaidOrdersCount } = useOrderContext();
  const router = useRouter();

  if (unpaidOrdersCount === 0) return null;

  const handleClick = (orderNo: string) => {
    setOpen(false);
    router.push(`/order-history?orderNo=${encodeURIComponent(orderNo)}`);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center rounded-full p-2.5 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors duration-300"
      >
        <Bell className="h-5 w-5 relative z-10" />
        {unpaidOrdersCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-emerald-950">
            {unpaidOrdersCount > 99 ? "99+" : unpaidOrdersCount}
          </span>
        )}
      </motion.button>

      <style>{`
        .bell-dropdown::-webkit-scrollbar {
          width: 3px;
        }
        .bell-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        .bell-dropdown::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 9999px;
        }
        .bell-dropdown {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.95,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.95,
              filter: "blur(4px)",
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-3 w-80 max-h-96 overflow-y-auto rounded-2xl bg-white shadow-xl shadow-black/10 border border-slate-200/80 py-2 z-50 bell-dropdown"
          >
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Unpaid Orders
              </p>
            </div>
            {unpaidOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => handleClick(order.order_no)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-900 truncate">
                    {order.order_no}
                  </span>
                  <span
                    className={getStatusBadge(order.payment_status, "payment")}
                  >
                    {order.payment_status}
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">
                  ৳ {order.total_amount}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
