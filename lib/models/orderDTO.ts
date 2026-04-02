/**
 * Order DTOs
 * Request and Response interfaces for orders
 */

// ==================== REQUEST DTOS ====================

export interface CreateOrderRequest {
  product_id: string;
  quantity: number;
  shipping_address: string;
  payment_method: string;
}

export interface UpdateOrderRequest {
  status?: string;
  shipping_address?: string;
}

// ==================== RESPONSE DTOS ====================

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shipping_address: string;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed";
  created_at: string;
  updated_at: string;
}

export interface CreateOrderResponse {
  message: string;
  order_id: string;
  order_number: string;
}

export interface GetOrdersResponse {
  message: string;
  orders: Order[];
  total: number;
  page: number;
  page_size: number;
}

export interface GetOrderByIdResponse {
  message: string;
  order: Order;
}
