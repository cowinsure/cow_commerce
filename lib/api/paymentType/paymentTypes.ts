
import { PAYMENT_TYPE_API } from "@/lib/api/routes";
import { MasterPaymentTypesResponse } from "@/lib/models/paymentTypeDTO";
import apiClient from "../apiClient";

export async function getPaymentTypes(): Promise<MasterPaymentTypesResponse> {
  const response = await apiClient.get<MasterPaymentTypesResponse>(
    PAYMENT_TYPE_API.GET_PAYMENT_TYPES,
    { params: { organization_id: 1 } }
  );
  const responseData = response.data;
  if (responseData.status === "error") {
    throw new Error(responseData.message || "Failed to fetch payment types");
  }
  return responseData;
}
