/**
 * Order Hook
 * Handles order business logic and state management
 * Provides order operations to components
 */

import { useState, useCallback } from "react";
import { createOrderApi, getOrdersApi, getOrderByIdApi } from "@/lib/api/order/order";
import { CreateOrderRequest, Order } from "@/lib/models/orderDTO";

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
}

export function useOrder() {
  const [state, setState] = useState<OrderState>({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
  });

  const createOrder = useCallback(async (data: CreateOrderRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await createOrderApi(data);
      setState((prev) => ({ ...prev, loading: false }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create order";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const fetchOrders = useCallback(async (page: number = 1, pageSize: number = 10) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getOrdersApi(page, pageSize);
      setState((prev) => ({
        ...prev,
        orders: response.orders,
        total: response.total,
        page: response.page,
        loading: false,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch orders";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const fetchOrderById = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getOrderByIdApi(id);
      setState((prev) => ({
        ...prev,
        currentOrder: response.order,
        loading: false,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch order";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setState((prev) => ({ ...prev, currentOrder: null }));
  }, []);

  return {
    ...state,
    createOrder,
    fetchOrders,
    fetchOrderById,
    clearError,
    clearCurrentOrder,
  };
}

export default useOrder;