import apiClient from "@/lib/api/apiClient";
import { PAYMENT_TYPE_API } from "@/lib/api/routes";
import { MasterPaymentTypesResponse } from "@/lib/models/paymentTypeDTO";

export async function getPaymentTypes(): Promise<MasterPaymentTypesResponse> {
  const response = await apiClient.get<MasterPaymentTypesResponse>(
    PAYMENT_TYPE_API.GET_PAYMENT_TYPES,
  );
  console.log(response);
  return response.data;
}
