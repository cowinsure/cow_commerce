/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OrderItem {
  id: number;
  name: string;
  breed: string;
  order_id: number;
  quantity: number;
  item_name: string;
  asset_type: string;
  created_at: string;
  unit_price: number;
  livestock_id: number;
  total_amount: number;
  category_name: string;
  inventory_item_id: number;
}

export interface TransactionDetail {
  id: number;
  ecom_order_master_id: number;

  amount: number;
  payment_type_id: number;
  payment_type_name: string;

  reference_no: string;
  image_path: string;

  payment_direction: "IN" | "OUT";
  payment_verification_status: "PENDING" | "VERIFIED" | "REJECTED";

  payment_date: string;

  remarks: string | null;

  created_at: string;
  created_by: number;
  updated_at: string;

  verified_at: string | null;
  verified_by: number | null;
}

export interface Order {
  id: number;
  remarks: null | string;
  order_no: string;
  last_name: string;
  created_at: string;
  created_by: number;
  customer_id: number;
  first_name: string;
  mobile_number: string;
  order_date: string;
  order_status: string;
  payment_status: string;
  approved_at: null | string;
  approved_by: null | number;
  item_details: OrderItem[];
  total_amount: number;
  transaction_details: TransactionDetail[];
}

export interface GetOrdersResponse {
  data: Order[];
  message: string;
  status: "success" | string;
  total: any;
  page: any;
}

export interface GetOrderByIdResponse {
  status: string;
  message: string;
  data: Order[];
}
