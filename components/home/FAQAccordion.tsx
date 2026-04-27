"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Truck,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Package,
  Clock,
} from "lucide-react";
import { faqData, FAQItems } from "@/data/faqData";

const categoryIcons: Record<string, React.ReactNode> = {
  "Delivery & Service Area": <Truck className="w-4 h-4" />,
  "Payment & Pricing": <CreditCard className="w-4 h-4" />,
  "Quality & Health": <ShieldCheck className="w-4 h-4" />,
  "Policies & Terms": <AlertTriangle className="w-4 h-4" />,
  "Booking Process": <Package className="w-4 h-4" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

function FAQItem({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItems;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 leading-snug">
              {item.question}
            </h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 text-gray-400 shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Group FAQs by category
  const groupedFAQs = faqData.reduce(
    (acc, item) => {
      const category = item.category || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, FAQItems[]>,
  );

  return (
    <section className="max-w-screen-2xl mx-auto px-6 py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Common Questions About{" "}
          <span className="text-emerald-600">Qurbani Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to the most common questions about our Qurbani services,
          payment, delivery, and policies.
        </p>
      </motion.div>

      {/* Category Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        {Object.entries(groupedFAQs).map(([category, items]) => (
          <div key={category} className="space-y-3">
            {/* Category Title */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                {category}
              </h3>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onClick={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you with any other inquiries.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/25"
          >
            Contact Support
          </a>
        </div>
      </motion.div>
    </section>
  );
}
