/**
 * Product DTOs
 * Request and Response interfaces for products
 */

// ==================== REQUEST DTOS ====================

export interface GetProductsRequest {
  page?: number;
  page_size?: number;
  category?: string;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface GetProductByIdRequest {
  id: string;
}

// ==================== RESPONSE DTOS ====================

export interface ProductImage {
  id: string;
  url: string;
  is_primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  breed: string;
  age: number;
  weight: number;
  price: number;
  category: string;
  images: ProductImage[];
  stock: number;
  is_available: boolean;
  seller_id: string;
  seller_name: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface GetProductsResponse {
  message: string;
  products: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface GetProductByIdResponse {
  message: string;
  product: Product;
}

export interface GetCategoriesResponse {
  message: string;
  categories: Category[];
}
