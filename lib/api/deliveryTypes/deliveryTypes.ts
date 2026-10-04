import apiClient from "../apiClient";
import { DELIVERY_SERVICE_API } from "../routes";
import { MasterDeliveryTypesResponse } from "@/lib/models/deliveryTypeDTO";

export async function getDeliveryTypes(): Promise<MasterDeliveryTypesResponse> {
  const response = await apiClient.get<MasterDeliveryTypesResponse>(
    DELIVERY_SERVICE_API.GET_DELIVERY_TYPES,
    { params: { organization_id: 1 } },
  );
  const responseData = response.data;
  if (responseData.status === "error") {
    throw new Error(responseData.message || "Failed to fetch delivery types");
  }
  return responseData;
}
