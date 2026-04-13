/**
 * Order API
 * Handles order-related HTTP requests
 */

import apiClient from "@/lib/api/apiClient";
import { ORDER_API } from "@/lib/api/routes";
import { GetOrderByIdResponse, GetOrdersResponse } from "@/lib/models/orderDTO";

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
