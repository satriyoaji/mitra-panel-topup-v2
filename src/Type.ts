import { NextFont } from "next/dist/compiled/@next/font";
import { StaticImageData } from "next/image";

export interface LooseObject {
  [key: string]: any;
}

export interface TTier {
  id: string;
  name: string;
  order?: number;
  markup_base?: number;
}

export interface TProductGroup {
  id: string;
  name: string;
}

export interface IProductFormBase {
  alias: string;
  key: string;
}

export interface IProductFormOption extends IProductFormBase {
  type: "option";
  options: string[];
}
export interface IProductFormText extends IProductFormBase {
  type: "text";
}
export interface IProductFormNumeric extends IProductFormBase {
  type: "numeric";
}

export type TProductForm =
  | IProductFormNumeric
  | IProductFormText
  | IProductFormOption;

export interface IProductCategory {
  uuid: string;
  // code: string;
  // alias: string;
  // status: number;
  // banner_image: string;
  // logo_image: string;
  description: string;
  forms?: TProductForm[];

  key: string;
  name: string;
  image_url: string;
}

export type TTiersPrice = {
  name: string;
  order: number;
  markup_base: number;
};

export interface IFlashSaleInProduct {
  id: number;
  discount_price: number;
  active: boolean;
  start_at: string;
  finish_at: string;
}
export interface IFlashSaleInfo {
  id: number;
  name: string;
  exapired_at: string;
}

export type TProduct = {
  uuid: string;
  product_sku: string;
  product_name: string;
  sale_price: number;
  category_alias: string;
  category_code: string;
  active: boolean;
  group_name: string;
  flash_sales?: IFlashSaleInProduct[];

  key: string;
  name: string;
  price: number;
};
export type TProductItem = {
  flash_sale_info?: IFlashSaleInfo;

  key: string;
  name: string;
  price: number;
  discounted_price: number;
  image_url: string;
};

export type TMarkup = "percentage" | "fix";

export interface IFlashSaleProductDetail {
  uuid: string;
  product_sku: string;
  product_name: string;
  sale_price: number;
  category_uuid: string;
  category_alias: string;
  category_code: string;
  active: boolean;
  group_name: string;
}

export interface IFlashSaleProduct extends IFlashSaleInProduct {
  product: IFlashSaleProductDetail;
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

export type IPaymentMethod = "transfer" | "transfer & points" | "points";

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

export interface IBank {
  url: string | StaticImageData;
  name: string;
  admin_fee?: number;
}

export interface ITransaction {
  product?: TProductItem;
  category?: IProductCategory | null;
  promo?: IPromo;
  payment?: IPaymentMethod;
  form?: LooseObject;
  account?: IAccount;
  bank?: IPayment;
}

export interface ITransactionHistoryList {
  date: string;
  transaction_code: string;
  category_name: string;
  product_name: string;
  status: number;
  status_name: string;
  price: number;
  payment_channel: string;
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

export interface ITransactionHistory {
  status: number;
  status_name: string;
  timestamp: string;
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
