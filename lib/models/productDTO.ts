export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

// ==================== LIVESTOCK ITEM GET ====================

export interface GetLiveStockParams {
  page_size?: number;
  start_record?: number;
  min_weight?: number;
  max_weight?: number;
  min_price?: number;
  max_price?: number;
  breed_id?: number;
  id?: string;
}

export interface LivestockItem {
  id: number;
  breed: string;
  owner: string;
  breed_id: number;
  unit_qty: number;
  branch_id: number;
  is_listed: boolean;
  listed_at: string;
  weight_kg: number;
  created_at: string;
  created_by: number;
  unit_price: number;
  is_available: boolean;
  livestock_id: number;
  reference_id: string;
  available_qty: number;
  booking_amount: number;
  listing_status: string;
  inventory_item_id: number;
  booking_amt_percentage: number;
  inv_transaction_id_for_purchase: number;
}

// ==================== COW DETAILS API ====================

export interface GetCowDetailsParams {
  page_size?: number;
  start_record?: number;
  asset_id?: number;
}

export interface CowDetails {
  id: number;
  name: string;
  breed: string;
  color: string;
  owner: string;
  gender: string;
  height: number;
  remarks: string;
  breed_id: number;
  latitude: number;
  owner_id: number;
  is_active: boolean;
  longitude: number;
  status_id: number;
  weight_kg: number;
  asset_type: string;
  created_at: string;
  updated_at: string;
  muzzle_video: string;
  reference_id: string;
  special_mark: string;
  age_in_months: number;
  challan_paper: string;
  health_issues: string;
  current_status: string;
  vaccine_status: string;
  left_side_image: string;
  vet_certificate: string;
  deworming_status: string;
  image_with_owner: string;
  right_side_image: string;
  status_created_at: string;
  last_deworming_date: string;
  chairman_certificate: string;
  last_vaccination_date: string;
}

export interface CowSummary {
  Total: number;
  Active: number;
}

export interface CowDetailsData {
  list: CowDetails[];
  summary: CowSummary;
}

export interface CowDetailsResponse {
  status: string;
  message: string;
  data: CowDetailsData;
}

// Legacy type aliases for backwards compatibility
export type Product = LivestockItem;
export type ProductImage = Record<string, never>;
