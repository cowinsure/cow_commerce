"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Banknote,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Order } from "@/lib/models/orderDTO";
import { PaymentType } from "@/lib/models/paymentTypeDTO";
import { PaymentOptions } from "@/components/cart/PaymentOptions";
import { usePaymentTypes } from "@/hooks/payments/usePaymentTypes";
import { useOrder } from "@/hooks/order/useOrder";

interface PaymentModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** The order to make payment for */
  order: Order | null;
  /** Callback when payment is successfully submitted */
  onSuccess: () => void;
  /** Loading state from parent */
  externalLoading?: boolean;
}

/** Payment value type for the form */
interface PaymentValue {
  paymentType: PaymentType | null;
  referenceNo: string;
  imageFile: File | null;
}

/** Initial payment value */
const initialPaymentValue: PaymentValue = {
  paymentType: null,
  referenceNo: "",
  imageFile: null,
};

/**
 * Payment Modal Component
 * Allows users to make payments against an order
 * Uses the existing PaymentOptions component
 */
export function PaymentModal({
  isOpen,
  onClose,
  order,
  onSuccess,
  externalLoading,
}: PaymentModalProps) {
  const { paymentTypes, loading: paymentTypesLoading } = usePaymentTypes("ISSUE");
  const { submitPayment } = useOrder();
  const [paymentValue, setPaymentValue] = useState<PaymentValue>(
    initialPaymentValue,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset form when modal opens/closes or order changes
  const resetForm = useCallback(() => {
    setPaymentValue(initialPaymentValue);
    setError(null);
    setSuccess(false);
  }, []);

  // Handle modal close
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  // Calculate payment amounts
  const totalAmount = order?.total_amount || 0;
  const paidAmount =
    order?.transaction_details?.reduce((sum, txn) => sum + (txn.amount || 0), 0) ||
    0;
  const remainingAmount = totalAmount - paidAmount;

  // Calculate booking amount (10% of total) - this should come from backend in real implementation
  const bookingAmount = totalAmount * 0.1;

  // Handle form changes from PaymentOptions
  const handlePaymentChange = (val: PaymentValue) => {
    setPaymentValue(val);
    setError(null);
  };

  // Validate form
  const validateForm = (): string | null => {
    if (!paymentValue.paymentType) {
      return "Please select a payment method";
    }
    if (!paymentValue.referenceNo.trim()) {
      return "Please enter a reference number";
    }
    if (!paymentValue.imageFile) {
      return "Please upload payment proof";
    }
    return null;
  };

  // Handle submission
  const handleSubmit = useCallback(async () => {
    if (!order) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // In a real implementation, you would upload the image first
      // and get the image path from the server
      // For now, we'll simulate with a placeholder
      const imagePath = paymentValue.imageFile
        ? `/uploads/${paymentValue.imageFile.name}`
        : "";

      // Submit payment using the hook
      await submitPayment({
        order_id: order.id,
        action: "RECEIVE_PAYMENT",
        order_transaction_details: [
          {
            amount: bookingAmount,
            payment_type_id: paymentValue.paymentType!.payment_type_id,
            reference_no: paymentValue.referenceNo,
            image_path: imagePath,
          },
        ],
      });

      // Show success state
      setSuccess(true);

      // Close after showing success
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit payment",
      );
    } finally {
      setSubmitting(false);
    }
  }, [
    order,
    paymentValue,
    bookingAmount,
    submitPayment,
    onSuccess,
    handleClose,
  ]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-5">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Process Payment</h2>
                    <p className="text-sm text-slate-400">
                      Complete your payment
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              {success ? (
                // Success State
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-slate-600">
                    Your payment has been submitted for verification.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-6 space-y-6 max-h-[80dvh] overflow-auto"
                >
                  {/* Order Info Card */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-linear-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">
                          Order Number
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          {order?.order_no || "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">
                          Total Amount
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          ৳ {totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                      <div>
                        <p className="text-xs text-slate-500">Paid</p>
                        <p className="text-sm font-semibold text-emerald-600">
                          ৳ {paidAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Remaining</p>
                        <p className="text-sm font-semibold text-rose-600">
                          ৳ {remainingAmount.toLocaleString()}
                        </p>
                      </div>
                    </div> */}
                  </motion.div>

                  {/* Booking Amount */}
                  {/* <motion.div
                    variants={itemVariants}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-900">
                        Booking Amount Due
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-amber-700">
                      ৳ {bookingAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      (10% of total amount)
                    </p>
                  </motion.div> */}

                  {/* Payment Options */}
                  <motion.div variants={itemVariants}>
                    <p className="text-sm font-semibold text-slate-900 mb-3">
                      Select Payment Method
                    </p>
                    {paymentTypesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
                      </div>
                    ) : (
                      <PaymentOptions
                        paymentTypes={paymentTypes}
                        value={paymentValue}
                        onChange={handlePaymentChange}
                      />
                    )}
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <p className="text-sm text-rose-700">{error}</p>
                    </motion.div>
                  )}

                  {/* Actions */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 pt-2"
                  >
                    <button
                      onClick={handleClose}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || externalLoading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting || externalLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Make Payment 
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PaymentModal;
