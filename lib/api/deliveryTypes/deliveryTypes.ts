import apiClient from "@/lib/api/apiClient";
import { DELIVERY_SERVICE_API } from "../routes";
import { MasterDeliveryTypesResponse } from "@/lib/models/deliveryTypeDTO";

export async function getDeliveryTypes(): Promise<MasterDeliveryTypesResponse> {
  const response = await apiClient.get<MasterDeliveryTypesResponse>(
    DELIVERY_SERVICE_API.GET_DELIVERY_TYPES,
  );
  return response.data;
}
