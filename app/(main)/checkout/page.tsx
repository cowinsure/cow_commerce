"use client";

import { useState, useMemo, Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShippingForm } from "@/components/cart/ShippingForm";
import { TrustBadges } from "@/components/cart/TrustBadges";

import { Modal } from "@/components/ui/Modal";
import TermsPage from "@/components/ui/TermsPage";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  Truck,
  AlertCircle,
  X,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { LivestockItem } from "@/lib/models/productDTO";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImageWithUrl } from "@/hooks/useImage";
import { useDeliveryTypes } from "@/hooks/deliveryTypes/useDeliveryTypes";
import { DeliveryType } from "@/lib/models/deliveryTypeDTO";
import { usePaymentTypes } from "@/hooks/payments/usePaymentTypes";
import { PaymentType } from "@/lib/models/paymentTypeDTO";
import { useLocalization } from "@/context/LocalizationContext";
import { useToast } from "@/components/ui/Toast";
import { createOrderApi, CreateOrderRequest } from "@/lib/api/order/order";
import { PaymentOptions } from "@/components/cart/PaymentOptions";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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

const WIZARD_ID = "checkout-wizard";

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

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

type StepperStep = {
  label: string;
  done: boolean;
  hasError: boolean;
};

// Stepper: current step highlighted, finished steps checked, steps with
// missing info turn red. Clicking goes back freely; going forward is validated.
function CheckoutStepper({
  steps,
  current,
  onSelect,
}: {
  steps: StepperStep[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-8">
      {steps.map((step, i) => {
        const isActive = i === current;
        return (
          <li key={step.label} className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? "step" : undefined}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                step.hasError
                  ? "bg-red-100 text-red-700 ring-2 ring-red-400/40"
                  : step.done
                    ? "bg-emerald-600 text-white"
                    : isActive
                      ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500/40"
                      : "bg-slate-200 text-slate-500 hover:bg-slate-300"
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-white/25">
                {step.hasError ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : step.done ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  i + 1
                )}
              </span>
              {step.label}
            </button>
            {i < steps.length - 1 && (
              <div
                className={`w-4 sm:w-10 h-0.5 ${step.done ? "bg-emerald-400" : "bg-slate-200"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// Inline red message that disappears as soon as the field is fixed
function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return (
    <p
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-600"
    >
      <AlertCircle className="w-4 h-4 shrink-0" />
      {message}
    </p>
  );
}

// Wraps a field group; paints it red while `error` is true
function ErrorZone({
  error,
  className = "",
  children,
}: {
  error: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-error={error ? "true" : undefined}
      className={`rounded-2xl transition-all ${
        error
          ? "ring-2 ring-red-300 p-2 bg-red-50/40 [&_input]:border-red-400! [&_textarea]:border-red-400!"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StepHeader({
  icon,
  tone = "emerald",
  title,
  subtitle,
  stepText,
}: {
  icon: ReactNode;
  tone?: "emerald" | "amber";
  title: string;
  subtitle: string;
  stepText: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          tone === "amber" ? "bg-amber-100" : "bg-emerald-100"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-emerald-600 mb-0.5">
          {stepText}
        </p>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
  editLabel,
}: {
  label: string;
  value: ReactNode;
  onEdit: () => void;
  editLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
        <div className="text-sm font-medium text-slate-900 break-words">
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 cursor-pointer"
      >
        {editLabel}
      </button>
    </div>
  );
}

// PaymentType field names aren't known here, so read the name defensively.
// Replace with the real field (e.g. paymentType.payment_type_name) if you like.
const getPaymentName = (p: PaymentType | null) => {
  if (!p) return "";
  const r = p as unknown as Record<string, unknown>;
  return String(r.payment_type_name ?? r.name ?? r.type_name ?? "");
};

/* ------------------------------------------------------------------ */
/* Main content                                                        */
/* ------------------------------------------------------------------ */

function CheckoutContent() {
  const { allDeliveryTypes } = useDeliveryTypes();
  const { paymentTypes } = usePaymentTypes("ISSUE");
  const { showToast } = useToast();
  const { t } = useLocalization();
  const searchParams = useSearchParams();
  const quantityParam = searchParams.get("quantity");
  const quantity = quantityParam ? parseInt(quantityParam, 10) : 1;

  // Falls back to English until the new translation keys are added
  const tr = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

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
  const [step, setStep] = useState(0); // 0 = Delivery, 1 = Payment, 2 = Confirm
  const [showErrors, setShowErrors] = useState([false, false, false]);
  const [formData, setFormData] = useState({
    address: "",
  });
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<DeliveryType | null>(null);
  const [paymentData, setPaymentData] = useState<{
    paymentType: PaymentType | null;
    referenceNo: string;
    imageFile: File | null;
    imagePreview?: string;
  }>({
    paymentType: null,
    referenceNo: "",
    imageFile: null,
  });
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
  const deliveryCharge =
    selectedDeliveryMethod?.delivery_charges?.[0]?.charge_amount ?? 0;

  // ---- Validation ----
  // Errors are derived: a field is red only after the user tried to continue
  // AND it is still empty. The moment they fill it in, the red goes away.
  const deliveryDone = !!selectedDeliveryMethod;
  const addressDone = !!formData.address.trim();
  const paymentTypeDone = !!paymentData.paymentType;
  const referenceDone = !!paymentData.referenceNo.trim();

  const stepValid = [
    deliveryDone && addressDone,
    paymentTypeDone && referenceDone,
    acceptTerms,
  ];

  const deliveryError = showErrors[0] && !deliveryDone;
  const addressError = showErrors[0] && deliveryDone && !addressDone;
  const paymentTypeError = showErrors[1] && !paymentTypeDone;
  const referenceError = showErrors[1] && paymentTypeDone && !referenceDone;
  const termsError = showErrors[2] && !acceptTerms;

  const flagStep = (i: number) =>
    setShowErrors((prev) => prev.map((v, idx) => (idx === i ? true : v)));

  const scrollToWizardTop = () =>
    setTimeout(
      () =>
        document
          .getElementById(WIZARD_ID)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );

  const scrollToFirstError = () =>
    setTimeout(() => {
      const el = document.querySelector('[data-error="true"]');
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      else scrollToWizardTop();
    }, 80);

  // Move to a step. Going back is always allowed; going forward requires
  // every earlier step to be valid, otherwise we stop at the first problem.
  const goTo = (target: number) => {
    if (target <= step) {
      setStep(target);
      scrollToWizardTop();
      return;
    }
    const bad = [0, 1].find((i) => i < target && !stepValid[i]);
    if (bad !== undefined) {
      setStep(bad);
      flagStep(bad);
      scrollToFirstError();
      return;
    }
    setStep(target);
    scrollToWizardTop();
  };

  const handleNext = () => {
    if (!stepValid[step]) {
      flagStep(step);
      scrollToFirstError();
      return;
    }
    goTo(step + 1);
  };

  //Handle checkout function
  const handleCheckout = async () => {
    if (!parsedPreloadedCow || isProcessing) return;

    // Earlier steps first, then terms
    const bad = [0, 1].find((i) => !stepValid[i]);
    if (bad !== undefined) {
      setStep(bad);
      flagStep(bad);
      scrollToFirstError();
      return;
    }
    if (!acceptTerms) {
      flagStep(2);
      scrollToFirstError();
      return;
    }
    if (!selectedDeliveryMethod || !paymentData.paymentType) return;

    try {
      setIsProcessing(true);

      let imagePath = "";
      if (paymentData.imageFile) {
        imagePath = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read image file"));
          reader.readAsDataURL(paymentData.imageFile!);
        });
      }

      const orderTransactionDetails = [
        {
          payment_type_id: paymentData.paymentType.payment_type_id,
          reference_no: paymentData.referenceNo.trim(),
          image_path: imagePath,
          amount: totalPrice,
        },
      ];

      const payload: CreateOrderRequest = {
        delivery_address: formData.address,
        organization_id: -1,
        branch_id: 1,
        item_details: [
          {
            livestock_id: parsedPreloadedCow.livestock_id,
            inventory_item_id: parsedPreloadedCow.inventory_item_id,
            unit_price: parsedPreloadedCow.unit_price,
            quantity: quantity,
          },
        ],
        shipping_method_id: selectedDeliveryMethod.id,
        order_transaction_details: orderTransactionDetails,
        charges: [
          {
            charge_type: "Delivery",
            amount: deliveryCharge,
          },
        ],
      };

      const res = await createOrderApi(payload);
      if (res.status === "success") {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      showToast(message, "error");
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
              {t("checkout_empty_title")}
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              {t("checkout_empty_description")}
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("checkout_back_to_marketplace")}
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
              {t("checkout_success_title")}
            </h1>
            <p className="text-slate-600 mb-8">
              {t("checkout_success_description_before")}{" "}
              <span className="font-semibold text-emerald-600">
                {parsedPreloadedCow.breed}
              </span>{" "}
              {t("checkout_success_description_after")}
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 transition-colors"
              >
                {t("checkout_return_to_marketplace")}
              </motion.button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  const stepLabels = [
    tr("checkout_step_delivery", "Delivery"),
    tr("checkout_step_payment", "Payment"),
    tr("checkout_step_confirm", "Confirm"),
  ];

  const stepperSteps: StepperStep[] = stepLabels.map((label, i) => ({
    label,
    done: i < step && stepValid[i],
    hasError: showErrors[i] && !stepValid[i],
  }));

  const stepText = (i: number) =>
    `${tr("checkout_step_label", "Step")} ${i + 1} ${tr("checkout_step_of", "of")} 3`;

  const stepHasVisibleError = showErrors[step] && !stepValid[step];

  const primaryLabel =
    step === 0
      ? tr("checkout_continue_payment", "Continue to payment")
      : step === 1
        ? tr("checkout_review_booking", "Review booking")
        : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 mt-10">
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
          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="mb-8 text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              {t("checkout_header_complete")}{" "}
              <span className="text-emerald-600">
                {t("checkout_header_booking")}
              </span>
            </h1>
          </motion.div>

          {/* Stepper */}
          <motion.div variants={itemVariants}>
            <CheckoutStepper
              steps={stepperSteps}
              current={step}
              onSelect={goTo}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: ONE step at a time */}
            <motion.div variants={slideInLeft} className="lg:col-span-7">
              <div
                id={WIZARD_ID}
                className="scroll-mt-28 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* ---------- STEP 1: Delivery ---------- */}
                    {step === 0 && (
                      <>
                        <StepHeader
                          stepText={stepText(0)}
                          title={t("checkout_shipping_title")}
                          subtitle={t("checkout_shipping_subtitle")}
                          icon={<Truck className="w-5 h-5 text-emerald-600" />}
                        />

                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            {t("checkout_select_delivery_option")}{" "}
                            <span className="text-gray-400 font-normal">
                              ({t("checkout_inside_dhaka_only")})
                            </span>
                          </label>
                          <ErrorZone error={deliveryError}>
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
                                      onClick={() =>
                                        setSelectedDeliveryMethod(method)
                                      }
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      aria-pressed={isSelected}
                                      className={`w-full p-2 rounded-xl border-2 transition-all duration-300 ${
                                        isSelected
                                          ? "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/10"
                                          : deliveryError
                                            ? "border-red-300 bg-white"
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
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                                            <span className="text-xs font-medium text-green-600">
                                              <FaBangladeshiTakaSign
                                                size={17}
                                              />{" "}
                                            </span>
                                            {charge?.charge_amount?.toLocaleString() ||
                                              0}
                                          </span>
                                          <p className="text-xs text-slate-400">
                                            {t("checkout_delivery_fee")}
                                          </p>
                                        </div>
                                      </div>
                                    </motion.button>
                                  );
                                })}
                            </div>
                          </ErrorZone>
                          <FieldError
                            show={deliveryError}
                            message={t("checkout_toast_select_delivery")}
                          />
                        </div>

                        {/* Address stays locked until delivery is chosen */}
                        {!selectedDeliveryMethod && (
                          <p className="mb-3 text-sm text-slate-500">
                            {tr(
                              "checkout_address_locked_hint",
                              "Choose a delivery option above to unlock the address form.",
                            )}
                          </p>
                        )}
                        <ErrorZone error={addressError}>
                          <ShippingForm
                            formData={formData}
                            setFormData={setFormData}
                            disabled={!selectedDeliveryMethod}
                          />
                        </ErrorZone>
                        <FieldError
                          show={addressError}
                          message={t("checkout_toast_enter_address")}
                        />
                      </>
                    )}

                    {/* ---------- STEP 2: Payment ---------- */}
                    {step === 1 && (
                      <>
                        <StepHeader
                          stepText={stepText(1)}
                          title={tr("checkout_payment_title", "Payment Method")}
                          subtitle={tr(
                            "checkout_payment_subtitle",
                            "Choose your preferred payment option",
                          )}
                          icon={<Lock className="w-5 h-5 text-emerald-600" />}
                        />
                        <ErrorZone error={paymentTypeError || referenceError}>
                          <PaymentOptions
                            paymentTypes={paymentTypes}
                            value={paymentData}
                            onChange={setPaymentData}
                          />
                        </ErrorZone>
                        <FieldError
                          show={paymentTypeError}
                          message={t("checkout_toast_select_payment")}
                        />
                        <FieldError
                          show={referenceError}
                          message={t("checkout_toast_enter_reference")}
                        />
                      </>
                    )}

                    {/* ---------- STEP 3: Confirm ---------- */}
                    {step === 2 && (
                      <>
                        <StepHeader
                          stepText={stepText(2)}
                          title={tr("checkout_confirm_title", "Review & confirm")}
                          subtitle={tr(
                            "checkout_confirm_subtitle",
                            "Check your details, then confirm your booking",
                          )}
                          icon={
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          }
                        />

                        {/* Review of previous steps, each editable */}
                        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 px-4 mb-6">
                          <ReviewRow
                            label={tr("checkout_review_delivery", "Delivery")}
                            editLabel={tr("checkout_edit", "Edit")}
                            onEdit={() => goTo(0)}
                            value={
                              <span className="flex items-center gap-2">
                                {selectedDeliveryMethod?.method_name}
                                <span className="text-slate-400 flex items-center">
                                  (<FaBangladeshiTakaSign size={12} />
                                  {deliveryCharge.toLocaleString()})
                                </span>
                              </span>
                            }
                          />
                          <ReviewRow
                            label={tr("checkout_review_address", "Address")}
                            editLabel={tr("checkout_edit", "Edit")}
                            onEdit={() => goTo(0)}
                            value={formData.address}
                          />
                          <ReviewRow
                            label={tr("checkout_review_payment", "Payment")}
                            editLabel={tr("checkout_edit", "Edit")}
                            onEdit={() => goTo(1)}
                            value={
                              <>
                                {getPaymentName(paymentData.paymentType) && (
                                  <span>
                                    {getPaymentName(paymentData.paymentType)}
                                    {" · "}
                                  </span>
                                )}
                                {tr("checkout_review_reference", "Ref")}:{" "}
                                {paymentData.referenceNo}
                                {paymentData.imageFile && (
                                  <span className="block text-xs text-emerald-600 mt-1">
                                    {tr(
                                      "checkout_review_proof",
                                      "Payment screenshot attached",
                                    )}
                                  </span>
                                )}
                              </>
                            }
                          />
                        </div>

                        {/* What happens next */}
                        <div className="mb-6 p-5 bg-amber-50/60 border border-amber-100 rounded-2xl">
                          <h3 className="font-bold text-slate-900 mb-1">
                            {t("checkout_process_title")}
                          </h3>
                          <p className="text-sm text-slate-500 mb-4">
                            {t("checkout_process_subtitle")}
                          </p>
                          <div className="space-y-4">
                            {[1, 2, 3].map((n) => (
                              <div key={n} className="flex gap-3">
                                <div className="w-7 h-7 shrink-0 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold text-sm">
                                  {n}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900 text-sm">
                                    {t(`checkout_step${n}_title`)}
                                  </h4>
                                  <p className="text-sm text-slate-500">
                                    {t(`checkout_step${n}_description`)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="mt-4 text-sm text-amber-800">
                            {t("checkout_process_note")}
                          </p>
                        </div>

                        {/* Terms */}
                        <ErrorZone error={termsError}>
                          <label className="flex items-start gap-3 rounded-2xl bg-white cursor-pointer group p-1">
                            <div className="relative shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) =>
                                  setAcceptTerms(e.target.checked)
                                }
                                className="peer sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2 ${
                                  acceptTerms
                                    ? "bg-emerald-600 border-emerald-600"
                                    : termsError
                                      ? "bg-white border-red-400"
                                      : "bg-white border-slate-300 group-hover:border-emerald-400"
                                }`}
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 transition-all duration-200 ${acceptTerms ? "text-white opacity-100 scale-100" : "text-transparent opacity-0 scale-50"}`}
                                />
                              </div>
                            </div>
                            <p className="flex-1 text-sm text-slate-700 leading-relaxed">
                              {t("checkout_terms_prefix")}{" "}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowTermsModal(true);
                                }}
                                className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors"
                              >
                                {t("checkout_terms_link")}
                              </button>{" "}
                              {t("checkout_terms_suffix")}
                            </p>
                          </label>
                        </ErrorZone>
                        <FieldError
                          show={termsError}
                          message={t("checkout_toast_accept_terms")}
                        />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Step footer: summary of problems + Back / Next */}
                {stepHasVisibleError && (
                  <div
                    role="alert"
                    className="mt-6 flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {tr(
                      "checkout_fix_errors",
                      "Please complete the items marked in red to continue.",
                    )}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-emerald-300 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {tr("checkout_back", "Back")}
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < 2 ? (
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all cursor-pointer"
                    >
                      {primaryLabel}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 sm:flex-none sm:min-w-64 py-4 bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
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
                          {t("checkout_processing")}
                        </>
                      ) : (
                        t("checkout_process_booking")
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Order Summary (always visible, read-only) */}
            <motion.div variants={slideInRight} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-900/5 border border-white overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        {t("checkout_summary_title")}
                      </h3>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        {t("checkout_summary_item_count", { count: 1 })}
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
                          alt={parsedPreloadedCow?.breed || t("checkout_cow")}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 mb-1">
                          {parsedPreloadedCow?.breed ||
                            t("checkout_premium_cow")}
                        </h4>
                        <p className="text-sm text-slate-500 mb-2">
                          {t("checkout_breed_label", {
                            breed: parsedPreloadedCow?.breed || "",
                          })}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">
                            {t("checkout_premium")}
                          </span>
                          <span className="text-xs text-slate-400">
                            {`× ${quantity} ${quantity > 1 ? t("checkout_units") : t("checkout_unit")}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Details */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">
                          {t("checkout_quantity")}
                        </span>
                        <span className="font-medium text-slate-900 flex items-end">
                          <span className="font-bold text-gray-500">
                            <X className="w-3" />
                          </span>
                          {quantity}{" "}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">
                          {t("checkout_unit_price")}
                        </span>
                        <span className="font-medium text-slate-900 flex items-center gap-1">
                          <FaBangladeshiTakaSign className="w-3 h-3 text-gray-500" />
                          {totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">
                          {t("checkout_booking_amount")}
                        </span>
                        <span className="font-medium text-slate-900 flex items-center gap-1">
                          <FaBangladeshiTakaSign className="w-3 h-3 text-gray-500" />
                          {bookingAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            {t("checkout_total_booking")}
                          </span>
                          <span className="text-3xl font-extrabold text-emerald-600 flex items-center gap-1">
                            <FaBangladeshiTakaSign className="w-5 h-5" />
                            {totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <TrustBadges />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Terms & Conditions Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title={t("checkout_terms_link")}
        size="full"
      >
        <TermsPage hideNavigation={true} />
      </Modal>
    </div>
  );
}