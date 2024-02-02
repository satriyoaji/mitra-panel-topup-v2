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

export interface IFlashSaleInProduct {
    id: number;
    discount_price: number;
    active: boolean;
    start_at: string;
    finish_at: string;
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

export interface IBanner {
    id: number;
    title: string;
    path: string;
}

export interface IPromo {
    id: string;
    code: string;
    promo_type: "fix" | "percentage";
    promo_value: number;
    showable: boolean;
    finish_at: string;
    limit_count?: number;
    ref_product?: TProduct;
    ref_category?: IProductCategory;
}
