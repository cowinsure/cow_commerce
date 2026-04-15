/**
 * Order API
 * Handles order-related HTTP requests
 */

import apiClient from "@/lib/api/apiClient";
import { ORDER_API } from "@/lib/api/routes";
import { GetOrderByIdResponse, GetOrdersResponse } from "@/lib/models/orderDTO";

// Payment transaction interface
export interface PaymentTransaction {
  amount: number;
  payment_type_id: number;
  reference_no: string;
  image_path: string;
}

// Process order request interface
export interface ProcessOrderRequest {
  order_id: number;
  action: "RECEIVE_PAYMENT";
  order_transaction_details: PaymentTransaction[];
}

// Process order response interface
export interface ProcessOrderResponse {
  status: string;
  message: string;
  data?: unknown;
}

// export async function createOrderApi(
//   data: CreateOrderRequest,
// ): Promise<CreateOrderResponse> {
//   const response = await apiClient.post<CreateOrderResponse>(
//     ORDER_API.CREATE_ORDER,
//     data,
//   );
//   return response.data;
// }

export async function getOrdersApi(
  page: number = 1,
  pageSize: number = 10,
): Promise<GetOrdersResponse> {
  const response = await apiClient.get<GetOrdersResponse>(
    ORDER_API.GET_ORDERS,
    {
      params: { page, page_size: pageSize },
    },
  );
  return response.data;
}

export async function getOrderByIdApi(
  id: number,
): Promise<GetOrderByIdResponse> {
  const response = await apiClient.get<GetOrderByIdResponse>(
    ORDER_API.GET_ORDER_BY_ID(id),
  );
  return response.data;
}

/**
 * Process order payment
 * Used for receiving payments against an order
 * @param data - Process order request with payment details
 * @returns Process order response
 */
export async function processOrderApi(
  data: ProcessOrderRequest,
): Promise<ProcessOrderResponse> {
  const response = await apiClient.put<ProcessOrderResponse>(
    ORDER_API.PROCESS_ORDER,
    data,
  );
  return response.data;
}
