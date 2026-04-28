"use client";

import { useLocalization } from "@/context/LocalizationContext";
import { useMemo } from "react";

export interface FAQItems {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Hook that returns localized FAQ data
export function useFAQData() {
  const { t } = useLocalization();

  return useMemo(
    () => [
      {
        id: "1",
        category: t("1_category"),
        categoryKey: "Delivery & Service Area",
        question: t("1_question"),
        answer: t("1_answer"),
      },
      {
        id: "2",
        category: t("2_category"),
        categoryKey: "Delivery & Service Area",
        question: t("2_question"),
        answer: t("2_answer"),
      },
      {
        id: "3",
        category: t("3_category"),
        categoryKey: "Delivery & Service Area",
        question: t("3_question"),
        answer: t("3_answer"),
      },
      {
        id: "4",
        category: t("4_category"),
        categoryKey: "Payment & Pricing",
        question: t("4_question"),
        answer: t("4_answer"),
      },
      {
        id: "5",
        category: t("5_category"),
        categoryKey: "Payment & Pricing",
        question: t("5_question"),
        answer: t("5_answer"),
      },
      {
        id: "6",
        category: t("6_category"),
        categoryKey: "Payment & Pricing",
        question: t("6_question"),
        answer: t("6_answer"),
      },
      {
        id: "7",
        category: t("7_category"),
        categoryKey: "Quality & Health",
        question: t("7_question"),
        answer: t("7_answer"),
      },
      {
        id: "8",
        category: t("8_category"),
        categoryKey: "Quality & Health",
        question: t("8_question"),
        answer: t("8_answer"),
      },
      {
        id: "9",
        category: t("9_category"),
        categoryKey: "Policies & Terms",
        question: t("9_question"),
        answer: t("9_answer"),
      },
      {
        id: "10",
        category: t("10_category"),
        categoryKey: "Policies & Terms",
        question: t("10_question"),
        answer: t("10_answer"),
      },
      {
        id: "11",
        category: t("11_category"),
        categoryKey: "Booking Process",
        question: t("11_question"),
        answer: t("11_answer"),
      },
    ],
    [t],
  );
}

// Keep the old interface for type compatibility (optional export)
export type { };
