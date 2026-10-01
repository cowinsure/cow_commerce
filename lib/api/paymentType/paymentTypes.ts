import { publicApiClient } from "@/lib/api/apiClient";
import { PAYMENT_TYPE_API } from "@/lib/api/routes";
import { MasterPaymentTypesResponse } from "@/lib/models/paymentTypeDTO";

export async function getPaymentTypes(): Promise<MasterPaymentTypesResponse> {
  const response = await publicApiClient.get<MasterPaymentTypesResponse>(
    PAYMENT_TYPE_API.GET_PAYMENT_TYPES,
  );
  const responseData = response.data;
  if (responseData.status === "error") {
    throw new Error(responseData.message || "Failed to fetch payment types");
  }
  return responseData;
}
