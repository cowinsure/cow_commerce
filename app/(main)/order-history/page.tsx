"use client";

import { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";

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

// Mock data matching the image
const orders = [
  {
    id: "#AGR-77291",
    name: "Midnight Sovereign",
    breed: "Angus Bull",
    grade: "Grade AAA",
    image: "/cows/cow1.jpg",
    units: 1,
    totalPrice: 12500,
    date: "Oct 12, 2024",
    status: "pending",
    timeLeft: "23:54:02",
  },
  {
    id: "#AGR-77102",
    name: "Merino Flock A2",
    breed: "Ewes",
    grade: "Batch 04",
    image: "/cows/cow2.jpg",
    units: 25,
    totalPrice: 8750,
    date: "Oct 08, 2024",
    status: "confirmed",
  },
  {
    id: "#AGR-76884",
    name: "Golden Mare",
    breed: "Quarter Horse",
    grade: "Pedigree",
    image: "/cows/cow3.jpg",
    units: 1,
    totalPrice: 22000,
    date: "Sep 24, 2024",
    status: "delivered",
  },
  {
    id: "#AGR-76521",
    name: "Deshi Black",
    breed: "Local Breed",
    grade: "Heritage",
    image: "/cows/cow4.jpg",
    units: 2,
    totalPrice: 9000,
    date: "Sep 18, 2024",
    status: "delivered",
  },
  {
    id: "#AGR-76432",
    name: "Sahiwal Premium",
    breed: "Dairy Cow",
    grade: "Organic",
    image: "/cows/cow5.jpg",
    units: 3,
    totalPrice: 15600,
    date: "Sep 10, 2024",
    status: "processing",
  },
];

const stats = [
  {
    label: "Active Orders",
    value: "12",
    subtext: "4 pending confirmation",
    icon: Box,
    color: "emerald",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  {
    label: "Total Booked",
    value: "৳84,200",
    subtext: "Lifetime value",
    icon: Wallet,
    color: "emerald",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  {
    label: "Deliveries",
    value: "08",
    subtext: "Next: Oct 24, 2024",
    icon: Truck,
    color: "amber",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
    dot: "bg-amber-500",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: CheckCircle2,
    dot: "bg-blue-500",
  },
  processing: {
    label: "Processing",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: Package,
    dot: "bg-purple-500",
  },
  delivered: {
    label: "Delivered",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: Truck,
    dot: "bg-emerald-500",
  },
};

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(
    (order) => selectedFilter === "all" || order.status === selectedFilter,
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
            <p className="text-lg text-slate-600 max-w-2xl">
              Manage your digital livestock acquisitions. View real-time status
              updates and download historical documentation.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
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
          </motion.div>

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
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 overflow-hidden">
              {["all", "pending", "confirmed", "delivered"].map((filter) => (
                <motion.button
                  key={filter}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    "px-6 py-4 rounded-2xl font-semibold text-sm capitalize whitespace-nowrap transition-all cursor-pointer",
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
            <div className="hidden lg:grid grid-cols-12 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-2">Order ID</div>
              <div className="col-span-3">Animal Details</div>
              <div className="col-span-1 text-center">Units</div>
              <div className="col-span-2 text-right">Total Price</div>
              <div className="col-span-2 text-center">Order Date</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              <AnimatePresence mode="wait">
                {filteredOrders.map((order, i) => {
                  const status =
                    statusConfig[order.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.05 }}
                      onHoverStart={() => setHoveredOrder(order.id)}
                      onHoverEnd={() => setHoveredOrder(null)}
                      className={cn(
                        "group grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center transition-all",
                        hoveredOrder === order.id && "bg-slate-50/80",
                      )}
                    >
                      {/* Order ID */}
                      <div className="lg:col-span-2 flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900">
                          {order.id}
                        </span>
                        {order.status === "pending" && order.timeLeft && (
                          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            {order.timeLeft}
                          </div>
                        )}
                      </div>

                      {/* Animal Details */}
                      <div className="lg:col-span-3 flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 relative shrink-0"
                        >
                          <Image
                            src={order.image}
                            alt={order.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {order.name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {order.breed} • {order.grade}
                          </p>
                        </div>
                      </div>

                      {/* Units */}
                      <div className="lg:col-span-1 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 font-bold text-slate-900">
                          {order.units}
                        </span>
                        <span className="lg:hidden ml-2 text-sm text-slate-500">
                          Units
                        </span>
                      </div>

                      {/* Price */}
                      <div className="lg:col-span-2 text-right">
                        <div className="font-bold text-slate-900 text-lg">
                          ৳{order.totalPrice.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500">BDT</div>
                      </div>

                      {/* Date */}
                      <div className="lg:col-span-2 text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {order.date}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="lg:col-span-1 flex justify-center">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border",
                            status.color,
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              status.dot,
                            )}
                          />
                          <StatusIcon className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {status.label}
                          </span>
                        </span>
                      </div>

                      {/* Action */}
                      <div className="lg:col-span-1 flex justify-end">
                        {order.status === "delivered" ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 rounded-xl font-semibold text-sm transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Receipt</span>
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </motion.button>
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
      </main>
    </div>
  );
}

// Utility for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
