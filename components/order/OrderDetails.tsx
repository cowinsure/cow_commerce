"use client";

import { useState } from "react";
import {
  formatDateToDDMMYYYY,
  getStatusBadge,
} from "@/app/(main)/order-history/page";
import { Order } from "@/lib/models/orderDTO";
import {
  ChevronDown,
  Package,
  CreditCard,
  User,
  Phone,
  Calendar,
  Hash,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  FileText,
  Banknote,
  Receipt,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface SelectedOrderProps {
  selectedOrder: Order;
}

const OrderDetails = ({ selectedOrder }: SelectedOrderProps) => {
  const [openSections, setOpenSections] = useState({
    items: true,
    payment: true,
  });

  const toggle = (key: "items" | "payment") => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Status configuration with colors and icons
  const getStatusConfig = (status: string, type: "order" | "payment") => {
    const configs = {
      PENDING: {
        color: "amber",
        icon: Clock,
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        iconBg: "bg-amber-100",
      },
      APPROVED: {
        color: "emerald",
        icon: CheckCircle2,
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        iconBg: "bg-emerald-100",
      },
      UNPAID: {
        color: "rose",
        icon: AlertCircle,
        bg: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-700",
        iconBg: "bg-rose-100",
      },
      PAID: {
        color: "emerald",
        icon: ShieldCheck,
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        iconBg: "bg-emerald-100",
      },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  // Timeline steps with enhanced logic
  const steps = [
    {
      label: "Order Placed",
      description: "Order received",
      icon: Package,
      completed: true,
      time: selectedOrder.order_date,
    },
    {
      label: "Confirmation",
      description: "Awaiting approval",
      icon: Phone,
      completed: selectedOrder.order_status !== "PENDING",
      time: selectedOrder.approved_at,
    },
    {
      label: "Payment",
      description:
        selectedOrder.payment_status === "PAID" ? "Paid" : "Awaiting payment",
      icon: CreditCard,
      completed: selectedOrder.payment_status === "PAID",
      time:
        selectedOrder.transaction_details?.[0]?.payment_date ||
        selectedOrder.order_date,
    },
    {
      label: "Confirmed",
      description: "Order approved",
      icon: CheckCircle2,
      completed: selectedOrder.order_status === "APPROVED",
      time: selectedOrder.approved_at,
    },
  ];

  const orderStatus = getStatusConfig(selectedOrder.order_status, "order");
  const paymentStatus = getStatusConfig(selectedOrder.payment_status, "payment");
  const OrderStatusIcon = orderStatus.icon;
  const PaymentStatusIcon = paymentStatus.icon;

  const paidAmount =
    selectedOrder.transaction_details?.reduce(
      (sum, txn) => sum + (txn.amount || 0),
      0
    ) || 0;
  const remainingAmount = selectedOrder.total_amount - paidAmount;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <Hash className="w-4 h-4" />
                <span>Order Number</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {selectedOrder.order_no}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold ${orderStatus.bg} ${orderStatus.text} border ${orderStatus.border}`}
              >
                <OrderStatusIcon className="w-4 h-4" />
                {selectedOrder.order_status}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold ${paymentStatus.bg} ${paymentStatus.text} border ${paymentStatus.border}`}
              >
                <PaymentStatusIcon className="w-4 h-4" />
                {selectedOrder.payment_status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                {formatDateToDDMMYYYY(selectedOrder.order_date)} at{" "}
                {new Date(selectedOrder.order_date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span>
                {selectedOrder.first_name} {selectedOrder.last_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{selectedOrder.mobile_number}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">
          Order Progress
        </h3>
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 hidden md:block">
            <div
              className="h-full bg-emerald-500 transition-all duration-700 ease-out"
              style={{
                width: `${
                  (steps.filter((s) => s.completed).length / (steps.length - 1)) * 100
                }%`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isLast = index === steps.length - 1;
              const isActive = step.completed;
              const isCurrent =
                !step.completed &&
                steps[index - 1]?.completed &&
                index > 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center text-center ${
                    isActive ? "opacity-100" : "opacity-60"
                  } ${isCurrent ? "opacity-100" : ""}`}
                >
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                      isActive
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110"
                        : isCurrent
                        ? "bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse"
                        : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p
                      className={`text-sm font-semibold ${
                        isActive || isCurrent
                          ? "text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                    {step.time && isActive && (
                      <p className="text-xs text-emerald-600 font-medium">
                        {formatDateToDDMMYYYY(step.time)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedOrder.order_status === "PENDING" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">
                Awaiting Confirmation
              </h4>
              <p className="text-sm text-amber-700 leading-relaxed">
                Your order has been received. Our team will contact you shortly
                at {selectedOrder.mobile_number} for confirmation.
              </p>
            </div>
          </div>
        )}

        {selectedOrder.order_status === "APPROVED" &&
          selectedOrder.payment_status === "UNPAID" && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-semibold text-rose-900 mb-1">
                  Payment Required
                </h4>
                <p className="text-sm text-rose-700 leading-relaxed">
                  Your order is confirmed. Please complete the payment of ৳
                  {remainingAmount.toLocaleString()} to finalize your booking.
                </p>
              </div>
            </div>
          )}

        {selectedOrder.order_status === "APPROVED" &&
          selectedOrder.payment_status === "PAID" && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-emerald-900 mb-1">
                  Order Confirmed
                </h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  Your order is fully confirmed and paid. We will contact you for
                  delivery arrangements.
                </p>
              </div>
            </div>
          )}

        {/* Quick Actions */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                Next Action
              </h4>
              <p className="text-sm text-slate-600">
                {selectedOrder.order_status === "PENDING"
                  ? "Wait for confirmation call"
                  : selectedOrder.payment_status === "UNPAID"
                  ? "Complete payment"
                  : "No action needed"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => toggle("items")}
          className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Order Items</h3>
              <p className="text-sm text-slate-500">
                {selectedOrder.item_details?.length || 0} item(s)
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 group-hover:text-slate-600 ${
              openSections.items ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.items && (
          <div className="border-t border-slate-100">
            <div className="p-5 space-y-4">
              {selectedOrder.item_details?.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                      {item.breed?.[0] || "?"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {item.breed} {item.item_name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs">
                          {item.asset_type}
                        </span>
                        <span>Qty: {item.quantity}</span>
                        <span className="text-slate-300">•</span>
                        <span>৳ {item.unit_price.toLocaleString()}/unit</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right sm:text-left">
                    <p className="text-lg font-bold text-slate-900">
                      ৳ {item.total_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Payment Details Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => toggle("payment")}
          className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Payment Details</h3>
              <p className="text-sm text-slate-500">
                {selectedOrder.transaction_details?.length || 0} transaction(s)
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 group-hover:text-slate-600 ${
              openSections.payment ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.payment && (
          <div className="border-t border-slate-100">
            <div className="p-5 space-y-4">
              {selectedOrder.transaction_details?.map((txn) => {
                const txnStatus = getStatusConfig(
                  txn.payment_verification_status,
                  "payment"
                );
                const TxnIcon = txnStatus.icon;
                return (
                  <div
                    key={txn.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          ৳ {txn.amount.toLocaleString()}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${txnStatus.bg} ${txnStatus.text} border ${txnStatus.border}`}
                      >
                        <TxnIcon className="w-3 h-3" />
                        {txn.payment_verification_status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1">Method</p>
                        <p className="font-medium text-slate-900">
                          {txn.payment_type_name.replace("Sale", "").trim()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Reference</p>
                        <p className="font-medium text-slate-900 font-mono">
                          {txn.reference_no}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Date</p>
                        <p className="font-medium text-slate-900">
                          {formatDateToDDMMYYYY(txn.payment_date)}
                        </p>
                      </div>
                      {txn.remarks && (
                        <div className="col-span-2">
                          <p className="text-slate-500 mb-1">Note</p>
                          <p className="font-medium text-slate-900">
                            {txn.remarks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {(!selectedOrder.transaction_details ||
                selectedOrder.transaction_details.length === 0) && (
                <div className="text-center py-8 text-slate-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p>No payment transactions yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
        <h3 className="text-sm font-semibold text-emerald-900 uppercase tracking-wider mb-4">
          Payment Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Total Order Value</span>
            <span className="font-semibold text-slate-900">
              ৳ {selectedOrder.total_amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-emerald-700 font-medium">Amount Paid</span>
            <span className="font-semibold text-emerald-700">
              ৳ {paidAmount.toLocaleString()}
            </span>
          </div>
          {remainingAmount > 0 && (
            <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-200">
              <span className="text-rose-700 font-medium">Remaining</span>
              <span className="font-bold text-rose-700 text-lg">
                ৳ {remainingAmount.toLocaleString()}
              </span>
            </div>
          )}
          {remainingAmount === 0 && (
            <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-200">
              <span className="text-emerald-800 font-medium">Status</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                Fully Paid
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Remarks */}
      {selectedOrder.remarks && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Remarks</h4>
              <p className="text-slate-600 leading-relaxed">
                {selectedOrder.remarks}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;