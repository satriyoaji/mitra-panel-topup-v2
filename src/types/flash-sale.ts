export interface IFlashSaleInProduct {
  category_key: string;
  key: string;
  name: string;
  image_url: string;
  price: number;
  discounted_price: number;
}
export interface IFlashSaleInfo {
  name: string;
  banner_url: string;
  image_url: string;
  expired_at: string;
  products: IFlashSaleInProduct[];
}
