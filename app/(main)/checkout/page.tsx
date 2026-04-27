"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShippingForm } from "@/components/cart/ShippingForm";
import { TrustBadges } from "@/components/cart/TrustBadges";
import { Modal } from "@/components/ui/Modal";
import TermsPage from "@/components/ui/TermsPage";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Truck,
  AlertCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { LivestockItem } from "@/lib/models/productDTO";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImageWithUrl } from "@/hooks/useImage";
import useApi from "@/hooks/useApi";
import { useToast } from "@/components/ui/Toast";
import { useDeliveryTypes } from "@/hooks/deliveryTypes/useDeliveryTypes";
import { DeliveryType } from "@/lib/models/deliveryTypeDTO";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.2,
    },
  },
};

export default function CartPage() {
  return (
    <Suspense fallback={<CheckoutLoadingState />}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutLoadingState() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="grow pt-24 pb-24 overflow-hidden">
        <div className="px-4 sm:px-8 max-w-screen-2xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-64 bg-slate-200 rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-7 space-y-6">
                <div className="h-64 bg-slate-200 rounded-3xl" />
                <div className="h-64 bg-slate-200 rounded-3xl" />
              </div>
              <div className="lg:col-span-5">
                <div className="h-96 bg-slate-200 rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckoutContent() {
  const { post } = useApi();
  const { allDeliveryTypes } = useDeliveryTypes();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const quantityParam = searchParams.get("quantity");
  const quantity = quantityParam ? parseInt(quantityParam, 10) : 1;

  //Base64 string data from params
  const preloadedCowData = searchParams.get("data");
  //Parsed cow data from base64
  const parsedPreloadedCow = useMemo(() => {
    if (!preloadedCowData) return null;
    try {
      return JSON.parse(atob(preloadedCowData)) as LivestockItem;
    } catch {
      return null;
    }
  }, [preloadedCowData]);

  // States
  const [formData, setFormData] = useState({
    address: "",
  });
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<DeliveryType | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalPrice = parsedPreloadedCow
    ? parsedPreloadedCow.unit_price * quantity
    : 0;
  const bookingAmount = parsedPreloadedCow
    ? parsedPreloadedCow.booking_amount
    : 0;

  //Handle checkout function
  const handleCheckout = async () => {
    setIsProcessing(true);
    if (!formData.address) {
      showToast("Please enter delivery address");
      setIsProcessing(false);
      return;
    }

    if (!acceptTerms) {
      showToast("Please accept the Terms & Conditions");
      setIsProcessing(false);
      return;
    }

    if (!parsedPreloadedCow) return;

    try {
      setIsProcessing(true);

      const payload = {
        delivery_address: formData.address,
        item_details: [
          {
            livestock_id: parsedPreloadedCow.livestock_id,
            inventory_item_id: parsedPreloadedCow.inventory_item_id,
            unit_price: parsedPreloadedCow.unit_price,
            quantity: quantity,
          },
        ],
        shipping_method_id: selectedDeliveryMethod?.id,
        order_transaction_details: [],
        charges: [
          {
            charge_type: "Delivery",
            amount:
              selectedDeliveryMethod?.delivery_charges?.[0]?.charge_amount,
          },
        ],
      };

      console.log("FINAL PAYLOAD:", payload);

      const res = await post("/invms/inventory-ecom-order-service/", payload);
      if (res.status === "success") {
        setShowSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!parsedPreloadedCow) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <main className="flex-1 flex items-center justify-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center px-4"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              No Item Selected
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Please select a cow from the marketplace to proceed with checkout.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </motion.button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <main className="flex-1 flex items-center justify-center pt-24 pb-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </motion.div>
            <h1 className="text-3xl font-black text-slate-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-slate-600 mb-8">
              Your booking for{" "}
              <span className="font-semibold text-emerald-600">
                {parsedPreloadedCow.breed}
              </span>{" "}
              has been secured. You will receive a confirmation email shortly.
            </p>
            {/* <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 relative">
                  <Image
                    src={cartItem?.image || "/cowImg/fallback.jpg"}
                    alt={parsedPreloadedCow.breed}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {parsedPreloadedCow.breed}
                  </p>
                  <p className="text-sm text-slate-500">
                    {parsedPreloadedCow.breed} Cow
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-sm">
                <span className="text-slate-500">Order ID</span>
                <span className="font-mono font-semibold">#COW-2024-8832</span>
              </div>
            </div> */}
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 transition-colors"
              >
                Return to Marketplace
              </motion.button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  console.log(selectedDeliveryMethod);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="grow pt-24 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 -right-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 sm:px-8 max-w-screen-2xl mx-auto"
        >
          {/* Breadcrumb & Back */}
          {/* <motion.div variants={itemVariants} className="mb-8">
            <Link href={`/cows/${cowId}`}>
              <motion.button
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cow Details
              </motion.button>
            </Link>
          </motion.div> */}

          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="mb-12 text-center lg:text-left"
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              <Lock className="w-4 h-4" />
              Secure Checkout
            </div> */}
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Complete Your <span className="text-emerald-600">Booking</span>
            </h1>
            {/* <p className="text-lg text-slate-600 max-w-2xl">
              Secure your share of premium livestock. All transactions are
              encrypted and protected.
            </p> */}
          </motion.div>

          {/* Checkout Progress */}
          {/* <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              {[
                { step: 1, label: "Shipping", icon: Truck },
                { step: 2, label: "Payment", icon: Lock },
                { step: 3, label: "Confirm", icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center">
                  <motion.div
                    animate={{
                      backgroundColor:
                        checkoutStep >= item.step ? "#059669" : "#e2e8f0",
                      color: checkoutStep >= item.step ? "#ffffff" : "#64748b",
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </motion.div>
                  {i < 2 && <div className="w-8 h-0.5 bg-slate-200 mx-2" />}
                </div>
              ))}
            </div>
          </motion.div> */}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Forms */}
            <motion.div
              variants={slideInLeft}
              className="lg:col-span-7 space-y-6"
            >
              {/* Shipping Section */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Shipping Details
                    </h2>
                    <p className="text-sm text-slate-500">
                      Where should we deliver?
                    </p>
                  </div>
                </div>
                {/* Delivery Method Selection */}
                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Select Delivery Option{" "}
                    <span className="text-gray-400 font-normal">
                      (Inside dhaka only)
                    </span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {allDeliveryTypes
                      ?.filter((method) => method.is_active)
                      .map((method) => {
                        const charge = method.delivery_charges?.[0];
                        const isSelected =
                          selectedDeliveryMethod?.id === method.id;
                        return (
                          <motion.button
                            key={method.id}
                            type="button"
                            onClick={() => setSelectedDeliveryMethod(method)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-2 rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/10"
                                : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={{
                                    scale: isSelected ? 1 : 0,
                                    opacity: isSelected ? 1 : 0,
                                  }}
                                  className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500"
                                />
                                <div className="text-left">
                                  <p className="font-semibold text-slate-900">
                                    {method.method_name}
                                  </p>
                                  {/* <p className="text-xs text-slate-500">
                                      {method.description || "Delivery service"}
                                    </p> */}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-lg font-bold text-emerald-600">
                                  <span className="text-xs font-medium text-slate-400">
                                    ৳{" "}
                                  </span>
                                  {charge?.charge_amount?.toLocaleString() || 0}
                                </span>
                                <p className="text-xs text-slate-400">
                                  delivery fee
                                </p>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                  </div>
                  {selectedDeliveryMethod && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100"
                    >
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <p className="text-sm text-emerald-700">
                        Selected:{" "}
                        <span className="font-semibold">
                          {
                            allDeliveryTypes.find(
                              (m) => m.id === selectedDeliveryMethod?.id,
                            )?.method_name
                          }
                        </span>
                        <span className="text-slate-400 ml-2">
                          (৳
                          {allDeliveryTypes
                            .find((m) => m.id === selectedDeliveryMethod?.id)
                            ?.delivery_charges?.[0]?.charge_amount?.toLocaleString() ||
                            0}
                          )
                        </span>
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Delivery Address */}
                <ShippingForm
                  formData={formData}
                  setFormData={setFormData}
                  disabled={!selectedDeliveryMethod}
                />
              </div>

              {/* Payment Section */}

              {/* Code with original payment methods */}
              {/* <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Payment Method
                    </h2>
                    <p className="text-sm text-slate-500">
                      Choose your preferred payment option
                    </p>
                  </div>
                </div>
                <PaymentOptions
                  paymentTypes={paymentTypes}
                  value={paymentData}
                  onChange={setPaymentData}
                />
              </div> */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Booking & Payment Process
                    </h2>
                    <p className="text-sm text-slate-500">
                      No payment required at checkout
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full text-emerald-700 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Place Your Booking
                      </h4>
                      <p className="text-sm text-slate-500">
                        We will receive your order and confirm livestock
                        availability.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full text-emerald-700 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Confirmation Call
                      </h4>
                      <p className="text-sm text-slate-500">
                        Our team will contact you to verify details and confirm
                        booking.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full text-emerald-700 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        Pay Booking Amount
                      </h4>
                      <p className="text-sm text-slate-500">
                        After confirmation, you will complete payment using your
                        preferred method.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer note */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                  <p className="text-sm text-amber-800">
                    Your booking is only confirmed after successful verification
                    and payment confirmation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Order Summary */}
            <motion.div variants={slideInRight} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Glassmorphism Summary Card */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-900/5 border border-white overflow-hidden">
                  {/* Decorative gradient */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        Order Summary
                      </h3>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        1 Item
                      </span>
                    </div>

                    {/* Product Card Mini */}
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white relative shrink-0">
                        <ImageWithUrl
                          src={
                            parsedPreloadedCow?.image_with_owner
                              ? parsedPreloadedCow?.image_with_owner
                              : "/cowImg/fallback.jpg"
                          }
                          alt={parsedPreloadedCow?.breed || "Cow"}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-1">
                          {parsedPreloadedCow?.breed || "Premium Cow"}
                          {/* {parsedPreloadedCow?.livestock_id} */}
                        </h4>
                        <p className="text-sm text-slate-500 mb-2">
                          {parsedPreloadedCow?.breed} Breed
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">
                            Premium
                          </span>
                          <span className="text-xs text-slate-400">
                            × {quantity} unit{quantity > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-">
                        <span className="text-slate-500">Quantity</span>
                        <span className="font-medium text-slate-900 flex items-end">
                          <span className="font-bold text-gray-500">
                            <X className="w-3" />
                          </span>
                          {quantity}{" "}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-">
                        <span className="text-slate-500">Unit Price</span>
                        <span className="font-medium text-slate-900 flex items-center gap-1">
                          <FaBangladeshiTakaSign className="w-3 h-3 text-gray-500" />
                          {totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-">
                        <span className="text-slate-500">Booking Amount</span>
                        <span className="font-medium text-slate-900 flex items-center gap-1">
                          <FaBangladeshiTakaSign className="w-3 h-3 text-gray-500" />
                          {bookingAmount.toLocaleString()}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="pt-4 border-t border-slate-200 ">
                        <div className="flex items-center justify-between">
                          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Total Booking
                          </span>
                          <span className=" text-3xl font-extrabold text-emerald-600 flex items-center gap-1">
                            <FaBangladeshiTakaSign className="w-5 h-5" />
                            {totalPrice.toLocaleString()}
                          </span>
                        </div>
                        {/* <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                            <ShieldCheck className="w-3 h-3" />
                            SECURED
                          </span>
                        </div> */}
                      </div>
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="mb-6">
                      <label className="flex items-start gap-3 rounded-2xl bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                        <div className="relative shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                              acceptTerms
                                ? "bg-emerald-600 border-emerald-600"
                                : "bg-white border-slate-300 group-hover:border-emerald-400"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 transition-all duration-200 ${acceptTerms ? "text-white opacity-100 scale-100" : "text-transparent opacity-0 scale-50"}`}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-700 leading-relaxed">
                            I agree to the{" "}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowTermsModal(true);
                              }}
                              className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors"
                            >
                              Terms & Conditions
                            </button>{" "}
                            and acknowledge that my booking is subject to
                            verification and confirmation.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      onClick={handleCheckout}
                      disabled={isProcessing || !acceptTerms}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 py-4 bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>Proccess Booking</>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <TrustBadges />
                </div>

                {/* Delivery Estimate */}
                {/* <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-amber-900">
                      Estimated Delivery
                    </h4>
                  </div>
                  <p className="text-amber-800 text-sm mb-2">
                    Your share certificate and processing updates will be
                    available within
                  </p>
                  <p className="text-2xl font-black text-amber-700">14 Days</p>
                </motion.div> */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      {/* Terms & Conditions Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms & Conditions"
        size="full"
      >
        <TermsPage hideNavigation={true} />
      </Modal>
    </div>
  );
}
