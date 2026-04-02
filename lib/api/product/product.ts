/**
 * Product API
 * Handles product-related HTTP requests
 */

import apiClient from "@/lib/api/apiClient";
import { PRODUCT_API } from "@/lib/api/routes";
import {
  GetProductsRequest,
  GetProductsResponse,
  GetProductByIdResponse,
  GetCategoriesResponse,
} from "@/lib/models/productDTO";

export async function getProductsApi(
  params?: GetProductsRequest,
): Promise<GetProductsResponse> {
  const response = await apiClient.get<GetProductsResponse>(
    PRODUCT_API.GET_PRODUCTS,
    {
      params,
    },
  );
  return response.data;
}

export async function getProductByIdApi(
  id: string,
): Promise<GetProductByIdResponse> {
  const response = await apiClient.get<GetProductByIdResponse>(
    PRODUCT_API.GET_PRODUCT_BY_ID(id),
  );
  return response.data;
}

export async function getCategoriesApi(): Promise<GetCategoriesResponse> {
  const response = await apiClient.get<GetCategoriesResponse>(
    PRODUCT_API.GET_CATEGORIES,
  );
  return response.data;
}
