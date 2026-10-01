import { publicApiClient } from "@/lib/api/apiClient";
import { DELIVERY_SERVICE_API } from "../routes";
import { MasterDeliveryTypesResponse } from "@/lib/models/deliveryTypeDTO";

export async function getDeliveryTypes(): Promise<MasterDeliveryTypesResponse> {
  const response = await publicApiClient.get<MasterDeliveryTypesResponse>(
    DELIVERY_SERVICE_API.GET_DELIVERY_TYPES,
  );
  const responseData = response.data;
  if (responseData.status === "error") {
    throw new Error(responseData.message || "Failed to fetch delivery types");
  }
  return responseData;
}
