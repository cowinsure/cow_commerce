export interface MasterPaymentTypesResponse {
  status: "success" | "error";
  message: string;
  data: PaymentType[];
}

export type TransactionType = "RESTOCK" | "ISSUE";

export interface PaymentType {
  is_active: boolean;
  payment_type_id: number;
  transaction_type: TransactionType;
  default_ledger_id: number;
  payment_type_name: string;
}
