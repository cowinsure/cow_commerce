/**
 * Product Hook
 * Handles product business logic and state management
 * Provides product operations to components
 */

import { useState, useCallback } from "react";
import { getProductsApi, getProductByIdApi, getCategoriesApi } from "@/lib/api/product/product";
import { GetProductsRequest, Product, Category } from "@/lib/models/productDTO";

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  categories: Category[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
}

export function useProduct() {
  const [state, setState] = useState<ProductState>({
    products: [],
    currentProduct: null,
    categories: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
  });

  const fetchProducts = useCallback(async (params?: GetProductsRequest) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getProductsApi(params);
      setState((prev) => ({
        ...prev,
        products: response.products,
        total: response.total,
        page: response.page,
        totalPages: response.total_pages,
        loading: false,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch products";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getProductByIdApi(id);
      setState((prev) => ({
        ...prev,
        currentProduct: response.product,
        loading: false,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch product";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getCategoriesApi();
      setState((prev) => ({
        ...prev,
        categories: response.categories,
        loading: false,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch categories";
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

  const clearCurrentProduct = useCallback(() => {
    setState((prev) => ({ ...prev, currentProduct: null }));
  }, []);

  return {
    ...state,
    fetchProducts,
    fetchProductById,
    fetchCategories,
    clearError,
    clearCurrentProduct,
  };
}

export default useProduct;