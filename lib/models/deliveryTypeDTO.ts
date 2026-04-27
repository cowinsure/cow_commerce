export interface MasterDeliveryTypesResponse {
  status: "success" | "error";
  message: string;
  data: DeliveryType[];
}

export interface DeliveryOptions {
  id: number;
  area_type: string;
  is_active: boolean;
  charge_amount: number;
  min_order_amounr: number;
}

export interface DeliveryType {
  id: number;
  is_active: boolean;
  desciption: string | null;
  method_name: string;
  delivery_charges: DeliveryOptions[];
}
