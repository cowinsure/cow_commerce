/**
 * Product Hook
 * Handles product business logic and state management
 * Provides product operations to components
 */

import { useState, useCallback } from "react";
import { getLiveStocksApi, getCowDetailsApi } from "@/lib/api/product/product";
import {
  LivestockItem,
  CowDetails,
  CowDetailsData,
  GetLiveStockParams,
} from "@/lib/models/productDTO";

interface ProductState {
  products: LivestockItem[];
  currentProduct: LivestockItem | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  // Cow Details State
  cowDetails: CowDetails[];
  cowSummary: { Total: number; Active: number } | null;
}

export function useProduct() {
  const [state, setState] = useState<ProductState>({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
    // Cow Details State
    cowDetails: [],
    cowSummary: null,
  });

  const fetchProducts = useCallback(
    async (filters?: {
      minWeight?: number;
      maxWeight?: number;
      minPrice?: number;
      maxPrice?: number;
      breeds?: string[];
    }) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        // Extract breed ID from filters (use first selected breed if any)
        const breedIdFromFilter =
          filters?.breeds && filters.breeds.length > 0
            ? parseInt(filters.breeds[0], 10)
            : undefined;

        // Build API params from filters
        const params: GetLiveStockParams = {
          page_size: 10,
          start_record: 1,
          min_weight: filters?.minWeight ?? 0,
          max_weight: filters?.maxWeight ?? 9999,
          min_price: filters?.minPrice ?? 0,
          max_price: filters?.maxPrice ?? 50000000,
          breed_id: breedIdFromFilter ?? -1,
          id: "-1",
        };

        const response = await getLiveStocksApi(params);
        // console.log("Products response:", response);
        setState((prev) => ({
          ...prev,
          products: response.data,
          total: response.data.length,
          page: 1,
          totalPages: 1,
          loading: false,
        }));
        return response;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch products";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    [],
  );

  // const fetchProductById = useCallback(async (id: string) => {
  //   setState((prev) => ({ ...prev, loading: true, error: null }));
  //   try {
  //     const response = await getProductByIdApi(id);
  //     setState((prev) => ({
  //       ...prev,
  //       currentProduct: response.data,
  //       loading: false,
  //     }));
  //     return response;
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : "Failed to fetch product";
  //     setState((prev) => ({
  //       ...prev,
  //       loading: false,
  //       error: errorMessage,
  //     }));
  //     throw error;
  //   }
  // }, []);

  // ==================== COW DETAILS ====================

  const fetchCowDetails = useCallback(async (id: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await getCowDetailsApi({
        asset_id: id,
      });
      setState((prev) => ({
        ...prev,
        cowDetails: response.data.list,
        cowSummary: response.data.summary,
        loading: false,
      }));
      return response;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch cow details";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // const fetchCategories = useCallback(async () => {
  //   setState((prev) => ({ ...prev, loading: true, error: null }));
  //   try {
  //     const response = await getCategoriesApi();
  //     setState((prev) => ({
  //       ...prev,
  //       categories: response.categories,
  //       loading: false,
  //     }));
  //     return response;
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : "Failed to fetch categories";
  //     setState((prev) => ({
  //       ...prev,
  //       loading: false,
  //       error: errorMessage,
  //     }));
  //     throw error;
  //   }
  // }, []);

  // const clearError = useCallback(() => {
  //   setState((prev) => ({ ...prev, error: null }));
  // }, []);

  // const clearCurrentProduct = useCallback(() => {
  //   setState((prev) => ({ ...prev, currentProduct: null }));
  // }, []);

  return {
    ...state,
    fetchProducts,
    fetchCowDetails,
    // fetchProductById,
    // fetchCategories,
    // clearError,
    // clearCurrentProduct,
  };
}

export default useProduct;
