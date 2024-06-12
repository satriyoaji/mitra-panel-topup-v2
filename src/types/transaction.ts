import { IProductCategory, LooseObject, TProduct, TProductItem } from "@/Type";

export interface ICategoryForm {
  key: string;
  value: string;
}

export interface ITransactionCreate {
  category_key: string;
  product_key: string;
  payment_method: string;
  payment_channel: string;
  email: string;
  phone: string;
  form_data?: ICategoryForm[];
}

export interface ITransactionHistory {
  status: number;
  status_name: string;
  timestamp: string;
}

export interface IPaymentInfo {
  invoice_code: string;
  payment_method: string;
  payment_channel: string;
  virtual_account_member: string;
  virtual_account_name: string;
  payment_amount: number;
  expired_at: string;
}

export interface ITransactionHistoryDetail {
  date: string;
  transaction_code: string;
  category_key: string;
  category_name: string;
  product_key: string;
  product_name: string;
  email: string;
  phone: string;
  order_description: string;
  customer_data: string;
  price: number;
  paid_price: number;
  history_status: ITransactionHistory[];
  payment_information: IPaymentInfo;
}

// =========== TRANSACTION CONTEXT ================
export interface IPayment {
  payment_method: "VIRTUAL_ACCOUNT" | "EWALLET" | "QR_CODE";
  payment_channel: string;
  name: string;
  image_url: string;
  fee_percent: number;
  fee_amount: number;
}

export interface IPaymentGroup {
  name: string;
  payment_method: IPayment[];
}

export interface IPromo {
  id: string;
  code: string;
  promo_type: "fix" | "percentage";
  promo_value: number;
  showable: boolean;
  start_at: string;
  finish_at: string;
  limit_count?: number;
  ref_product?: TProduct;
  ref_category?: IProductCategory;
}

export interface IAccount {
  noWhatsapp: string;
  email: string;
}

export interface ITransaction {
  product?: TProductItem;
  category?: IProductCategory | null;
  promo?: IPromo;
  payment?: IPayment;
  form?: LooseObject;
  account?: IAccount;
}

// ===============================================
