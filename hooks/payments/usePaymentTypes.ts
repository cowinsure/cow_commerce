"use client";

import { useEffect, useState, useMemo } from "react";
import {
  PaymentType,
} from "@/lib/models/paymentTypeDTO";
import { getPaymentTypes } from "@/lib/api/paymentType/paymentTypes";

type TransactionType = "ISSUE" | "RESTOCK";

export function usePaymentTypes(transactionType?: TransactionType) {
  const [data, setData] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        setLoading(true);
        const res = await getPaymentTypes();

        if (res.status === "success") {
          setData(res.data);
        } else {
          setError(res.message || "Failed to fetch payment types");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentTypes();
  }, []);

  // 🎯 Derived filtered data
  const filteredData = useMemo(() => {
    if (!transactionType) return data;

    return data.filter((item) => item.transaction_type === transactionType);
  }, [data, transactionType]);

  return {
    paymentTypes: filteredData,
    allPaymentTypes: data,
    loading,
    error,
  };
}
