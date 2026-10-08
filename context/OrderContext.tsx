"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import useOrder from "@/hooks/order/useOrder";
import { Order } from "@/lib/models/orderDTO";
import { useAuth } from "@/hooks/auth/useAuth";

interface OrderContextValue {
  orders: Order[];
  unpaidOrders: Order[];
  unpaidOrdersCount: number;
  loading: boolean;
  error: string | null;
  refreshOrders: () => Promise<void>;
  fetchOrderById: ReturnType<typeof useOrder>["fetchOrderById"];
  submitPayment: ReturnType<typeof useOrder>["submitPayment"];
  clearError: ReturnType<typeof useOrder>["clearError"];
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { orders, loading, error, fetchOrders, fetchOrderById, submitPayment, clearError } =
    useOrder();

  const { isAuthenticated } = useAuth();

  const refreshOrders = async () => {
    try {
      await fetchOrders(1, 99, 1);
    } catch {
      // error is handled by useOrder state
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshOrders();
    }
  }, [isAuthenticated]);

  const unpaidOrders = orders.filter(
    (o) => o.payment_status.toLowerCase() === "unpaid",
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        unpaidOrders,
        unpaidOrdersCount: unpaidOrders.length,
        loading,
        error,
        refreshOrders,
        fetchOrderById,
        submitPayment,
        clearError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return ctx;
}
