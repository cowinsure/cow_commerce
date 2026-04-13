"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  FileText,
  Calendar,
  Wallet,
  Box,
  EyeClosed,
  Eye,
} from "lucide-react";
import Image from "next/image";
import useOrder from "@/hooks/order/useOrder";
import { Order } from "@/lib/models/orderDTO";
import Tooltip from "@/components/ui/ToolTip";
import { Modal } from "@/components/ui/Modal";
import OrderDetails from "@/components/order/OrderDetails";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

export const formatDateToDDMMYYYY = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

type StatusType = "order" | "payment";

export const getStatusBadge = (status: string, type: StatusType) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all";

  const styles: Record<string, string> = {
    // PAYMENT STATUS
    paid: "bg-emerald-50 text-emerald-500",
    unpaid: "bg-red-50 text-red-400",

    // ORDER STATUS
    pending: "bg-amber-50 text-amber-500",
    approved: "bg-blue-50 text-blue-500",
  };

  const normalized = status?.toLowerCase();

  return `${base} ${styles[normalized] || "bg-slate-100 text-slate-600"}`;
};

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);
  const [apiOrders, setApiOrders] = useState<Order[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const { fetchOrders, fetchOrderById, loading, error } = useOrder();

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const getOrders = await fetchOrders();
        setApiOrders(getOrders.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadOrder();
  }, [fetchOrders]);

  const handleViewOrder = async (order: Order) => {
    try {
      setIsModalOpen(true); // open instantly for UX
      setDetailsLoading(true);

      const res = await fetchOrderById(order.id);

      setSelectedOrder(res?.data?.[0] ?? null); // Get first order from array
    } catch (err) {
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = (apiOrders || []).filter(
    (order) =>
      selectedFilter === "all" ||
      order.order_status.toLowerCase() === selectedFilter,
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 mt-10">
      <main className="grow pt-24 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 sm:px-8 max-w-screen-2xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Order <span className="text-emerald-600">History</span>
            </h1>
            <p className=" text-slate-600 max-w-2xl">
              Manage your digital livestock acquisitions. View real-time status
              updates and download historical documentation.
            </p>
          </motion.div>

          {/* Stats Cards */}
          {/* <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                custom={i}
                className={cn(
                  "relative overflow-hidden rounded-3xl p-8",
                  stat.bgColor,
                )}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        "text-sm font-semibold uppercase tracking-wider",
                      )}
                    >
                      {stat.label}
                    </span>
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                      )}
                    >
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div
                    className={cn("text-5xl font-black mb-2", stat.textColor)}
                  >
                    {stat.value}
                  </div>

                  <p className={cn("text-sm")}>{stat.subtext}</p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Filters & Search */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders by ID or animal name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 overflow-hidden">
              {["all", "pending", "approved"].map((filter) => (
                <motion.button
                  key={filter}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    "px-6 py-3 rounded-2xl font-semibold text-sm capitalize whitespace-nowrap transition-all cursor-pointer",
                    selectedFilter === filter
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-100",
                  )}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Orders Table */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-6 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="">Order Date</div>
              <div className="">Order No</div>
              <div className="text-center">Total Amount</div>
              <div className="text-center">Order Status</div>
              <div className="text-center">Payment Status</div>
              <div className="text-center">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order, i) => {
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.05 }}
                      onHoverStart={() => setHoveredOrder(order.mobile_number)}
                      onHoverEnd={() => setHoveredOrder(null)}
                      className={cn(
                        "group grid grid-cols-1 lg:grid-cols-6 gap-4 p-4 items-center *:transition-transform *:duration-300 *:ease-out hover:bg-emerald-50/40 *:group-hover:scale-105",
                      )}
                    >
                      {/* Order Date */}
                      <div className=" flex items-center gap-4">
                        <h4 className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {formatDateToDDMMYYYY(order.order_date)}
                        </h4>
                      </div>

                      {/* Order ID */}
                      <div className=" flex items-center gap-3">
                        <span className="font-mono font- text-slate-800">
                          {order.order_no}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-center ">
                        <span className="font-bold text-slate-600 text-center group-hover:text-emerald-600">
                          ৳ {order.total_amount}
                        </span>
                      </div>

                      {/* order status */}
                      <div className="text-center text-sm">
                        <span
                          className={getStatusBadge(
                            order.order_status,
                            "order",
                          )}
                        >
                          {order.order_status}
                        </span>
                      </div>

                      {/* payment status */}
                      <div className="text-center text-sm">
                        <span
                          className={getStatusBadge(
                            order.payment_status,
                            "payment",
                          )}
                        >
                          {order.payment_status}
                        </span>
                      </div>

                      {/* Action */}
                      <div className=" flex justify-center group cursor-pointer">
                        {order.order_status === "APPROVED" ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 rounded-xl font-semibold text-sm transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Receipt</span>
                          </motion.button>
                        ) : (
                          <Tooltip content="View order">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleViewOrder(order)}
                              className="group relative p-4 rounded-lg bg-slate-100 group-hover:bg-emerald-50 text-slate-600 transition-colors cursor-pointer"
                            >
                              {/* EyeClosed */}
                              <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 group-hover:opacity-0 group-hover:scale-75">
                                <EyeClosed className="w-4 h-4" />
                              </span>

                              {/* Eye */}
                              <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
                                <Eye className="w-4 h-4 text-emerald-600" />
                              </span>
                            </motion.button>
                          </Tooltip>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Box className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  No orders found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your filters or search query
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Pagination */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mt-8"
          >
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                1-{filteredOrders.length}
              </span>{" "}
              of <span className="font-semibold text-slate-900">48</span> orders
            </p>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex gap-1">
                {[1, 2, 3].map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-10 h-10 rounded-xl font-bold text-sm transition-all",
                      currentPage === page
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-emerald-300",
                    )}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Modal for Order Details */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Order Details"
          size="full"
        >
          {selectedOrder && <OrderDetails selectedOrder={selectedOrder} />}
        </Modal>
      </main>
    </div>
  );
}

// Utility for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
