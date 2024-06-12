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
