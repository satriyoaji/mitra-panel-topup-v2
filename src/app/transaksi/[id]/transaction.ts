import { ITransaction } from "@/Type";

export const transaction: ITransaction = {
    payment: "transfer",
    account: { email: "", noWhatsapp: "" },
    category: {
        uuid: "4c0af17a-9883-4f6c-9b78-da1a5d03f84b",
        key: "Indosat-C",
        name: "INDOSAT",
        description: "",
        image_url: "",
        forms: [
            {
                key: "hp",
                type: "numeric",
                alias: "HP",
            },
        ],
    },
    form: { hp: null },
    product: {
        uuid: "c6d0d934-d301-440c-8d06-745dde7313c1",
        product_sku: "ISATTRF25",
        product_name: "Indosat Pulsa Transfer 25.000",
        group_name: "",
        key: "",
        name: "",
        price: 26294.998,
        sale_price: 26294.998,
        category_alias: "",
        category_code: "Indosat-C",
        active: true,
        flash_sales: [
            {
                id: 1,
                discount_price: 2500,
                start_at: "2024-01-15T07:00:00+07:00",
                finish_at: "2024-09-27T07:00:00+07:00",
                active: true,
            },
        ],
    },
    promo: {
        id: "",
        ref_category: {
            uuid: "4c0af17a-9883-4f6c-9b78-da1a5d03f84b",
            key: "Indosat-C",
            name: "INDOSAT",
            description: "",
            image_url: "",
        },
        code: "KLMSDA32",
        promo_type: "percentage",
        promo_value: 5,
        limit_count: 1,
        showable: true,
        start_at: "2024-02-04T07:00:00+07:00",
        finish_at: "2024-07-29T07:00:00+07:00",
    },
    bank: { name: "Mandiri", url: "/Bank/Mandiri.PNG" },
};
