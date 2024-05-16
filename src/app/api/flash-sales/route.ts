import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const url = new URL(req.url as string);

    let qParams = url.searchParams;
    qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);

    // var re = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/product-flash-sales?` + qParams,
    //     {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         cache: "no-store",
    //     }
    // );

    // var result = await re.json();
    var result = {
        status: "SUCCESS",
        code: "0000",
        data: [
            {
                id: 6,
                created_at: "2024-01-06T05:26:16.204836+07:00",
                updated_at: "2024-01-06T05:26:16.204836+07:00",
                product: {
                    uuid: "3dcd16cb-e78b-425c-8356-e3250b5e7a0c",
                    product_sku: "ISATTRF50",
                    product_name: "Indosat Pulsa Transfer 50.000",
                    sale_price: 59876,
                    category_uuid: "4c0af17a-9883-4f6c-9b78-da1a5d03f84b",
                    category_alias: "INDOSAT",
                    category_code: "Indosat-C",
                    active: true,
                    group_name: "Pulsa Provider"
                },
                discount_price: 1000,
                start_at: "2023-05-06T07:00:00+07:00",
                finish_at: "2023-05-07T07:00:00+07:00",
                active: true
            },
            {
                id: 4,
                created_at: "2024-01-06T05:07:03.974191+07:00",
                updated_at: "2024-01-06T05:24:24.814001+07:00",
                product: {
                    uuid: "c72be282-1175-401d-a885-a429ed952b47",
                    product_sku: "GSIXBWM",
                    product_name: "Genshin Impact Blessing of the Welkin Moon",
                    sale_price: 71102.8,
                    category_uuid: "105204e8-4235-4c0c-82ea-764db1089703",
                    category_alias: "Genshin Impact",
                    category_code: "GenshinImpact-C",
                    active: true,
                    group_name: "Trial"
                },
                discount_price: 2000,
                start_at: "2023-05-07T07:00:00+07:00",
                finish_at: "2023-05-08T07:00:00+07:00",
                active: true
            }
        ],
        pagination: {
            page_num: 1,
            page_size: 2,
            total_data: 4
        },
        error_message: null
    }
    return NextResponse.json(result, { status: 200 });
}
