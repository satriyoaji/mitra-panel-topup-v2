import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);

    let qParams = url.searchParams;
    qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);
    qParams.append("showable", "true");

    // var re = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/product-promos?` + qParams,
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
        "status": "SUCCESS",
        "code": "0000",
        "data": [
            {
                "id": 7,
                "user_mitra_id": 1,
                "ref_category_id": 310,
                "ref_category": {
                    "uuid": "2f7771b3-a78c-45ef-9ea6-728386b14b36",
                    "code": "yyu-category-code",
                    "alias": "yyu-category-name",
                    "status": 0,
                    "description": ""
                },
                "ref_product_id": null,
                "ref_product": null,
                "code": "MMK2JKQNKM",
                "promo_type": "percentage",
                "promo_value": 20,
                "limit_count": 15,
                "showable": true,
                "start_at": "2024-01-23T07:00:00+07:00",
                "finish_at": "2024-01-27T07:00:00+07:00",
                "created_at": "2024-01-25T02:42:51.120452+07:00",
                "updated_at": "2024-01-28T22:35:37.991933+07:00"
            },
            {
                "id": 3,
                "user_mitra_id": 1,
                "ref_category_id": 310,
                "ref_category": {
                    "uuid": "2f7771b3-a78c-45ef-9ea6-728386b14b36",
                    "code": "yyu-category-code",
                    "alias": "yyu-category-name",
                    "status": 0,
                    "description": ""
                },
                "ref_product_id": null,
                "ref_product": null,
                "code": "N3KQJKJ3QNK",
                "promo_type": "fix",
                "promo_value": 1000,
                "limit_count": 0,
                "showable": false,
                "start_at": "2024-01-23T07:00:00+07:00",
                "finish_at": "2024-01-27T07:00:00+07:00",
                "created_at": "2024-01-24T11:11:02.872356+07:00",
                "updated_at": "2024-01-24T11:11:02.872356+07:00"
            },
            {
                "id": 2,
                "user_mitra_id": 1,
                "ref_category_id": null,
                "ref_category": null,
                "ref_product_id": 3754,
                "ref_product": {
                    "uuid": "3dcd16cb-e78b-425c-8356-e3250b5e7a0c",
                    "product_sku": "ISATTRF50",
                    "product_name": "Indosat Pulsa Transfer 50.000",
                    "base_price": 0,
                    "group_id": 3,
                    "active": true,
                    "markup_type": null,
                    "markup_value": null
                },
                "code": "KJN23N9LMO",
                "promo_type": "fix",
                "promo_value": 500,
                "limit_count": 7,
                "showable": true,
                "start_at": "2024-01-23T07:00:00+07:00",
                "finish_at": "2024-01-27T07:00:00+07:00",
                "created_at": "2024-01-24T11:03:01.38649+07:00",
                "updated_at": "2024-01-28T22:28:11.22399+07:00"
            }
        ],
        "pagination": null,
        "error_message": null
    }

    return NextResponse.json(result, { status: 200 });
}
