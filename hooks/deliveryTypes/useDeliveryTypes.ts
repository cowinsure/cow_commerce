"use client";

import { getDeliveryTypes } from "@/lib/api/deliveryTypes/deliveryTypes";
import { DeliveryType } from "@/lib/models/deliveryTypeDTO";
import { useEffect, useState, useMemo } from "react";

export function useDeliveryTypes() {
  const [data, setData] = useState<DeliveryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveryTypes = async () => {
      try {
        setLoading(true);
        const res = await getDeliveryTypes();

        if (res.status === "success") {
          setData(res.data);
        } else {
          setError(res.message || "Failed to fetch delivery types");
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryTypes();
  }, []);

  return {
    allDeliveryTypes: data,
    loading,
    error,
  };
}
