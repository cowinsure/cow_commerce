import { publicApiClient } from "@/lib/api/apiClient";
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
  const response = await publicApiClient.get<ApiResponse<LivestockItem>>(
    PRODUCT_API.GET_PRODUCTS,
    {
      params,
    },
  );

  const responseData = response.data;
  if (responseData.status === "failed") {
    throw new Error(responseData.message || "Failed to fetch livestock");
  }
  return responseData;
}

/**
 Get Cow Details API
 */
export async function getCowDetailsApi(
  params: GetCowDetailsParams,
): Promise<CowDetailsResponse> {
  const { asset_id: id } = params;

  if (typeof id !== "number") {
    throw new Error("Cow ID is required");
  }

  const response = await publicApiClient.get<CowDetailsResponse>(
    PRODUCT_API.GET_COW_DETAILS,
    {
      params: { asset_id: id },
    },
  );
  const responseData = response.data;
  if (responseData.status === "failed") {
    throw new Error(responseData.message || "Failed to fetch cow details");
  }
  return responseData;
}

// export async function getCategoriesApi(): Promise<GetCategoriesResponse> {
//   const response = await apiClient.get<GetCategoriesResponse>(
//     PRODUCT_API.GET_CATEGORIES,
//   );
//   return response.data;
// }
