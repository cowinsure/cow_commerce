import apiClient from "@/lib/api/apiClient";
import { PRODUCT_API } from "@/lib/api/routes";
import {
  ApiResponse,
  GetLiveStockParams,
  LivestockItem,
  GetCowDetailsParams,
  CowDetailsResponse,
} from "@/lib/models/productDTO";

export async function getLiveStocksApi(
  params: GetLiveStockParams,
): Promise<ApiResponse<LivestockItem>> {
  const response = await apiClient.get<ApiResponse<LivestockItem>>(
    PRODUCT_API.GET_PRODUCTS,
    {
      params, // ✅ THIS is the key
    },
  );

  return response.data;
}

/**
 * Get Cow Details API
 */
export async function getCowDetailsApi(
  params: GetCowDetailsParams,
): Promise<CowDetailsResponse> {
  const { asset_id: id } = params;

  // ID is required for this API
  if (typeof id !== "number") {
    throw new Error("Cow ID is required");
  }

  const endpoint = "/lms/assets-service/";

  const response = await apiClient.get<CowDetailsResponse>(endpoint, {
    params: { asset_id: id },
  });
  return response.data;
}

// export async function getCategoriesApi(): Promise<GetCategoriesResponse> {
//   const response = await apiClient.get<GetCategoriesResponse>(
//     PRODUCT_API.GET_CATEGORIES,
//   );
//   return response.data;
// }
