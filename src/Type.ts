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

export interface IProductCategory {
    uuid: number;
    code: string;
    alias: string;
    status: number;
    banner_image: string;
    logo_image: string;
    description: string;
}

export type TTiersPrice = {
    name: string;
    order: number;
    markup_base: number;
};

export type TProduct = {
    uuid: string;
    product_sku: string;
    product_name: string;
    sale_price: number;
    category_alias: string;
    category_code: string;
    active: boolean;
    group_name: string;
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

export interface IFlashSaleProduct {
    id: number;
    discount_price: number;
    active: boolean;
    product: IFlashSaleProductDetail;
    start_at: string;
    finish_at: string;
}
