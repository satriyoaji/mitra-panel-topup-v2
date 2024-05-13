import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;

    // var re = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/product-promos/${slug}?` +
    //         new URLSearchParams({
    //             mitra_id: process.env.NEXT_MITRA_ID as string,
    //         }),
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
        "data": {
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
            "limit_count": null,
            "showable": true,
            "start_at": "2024-01-23T07:00:00+07:00",
            "finish_at": "2024-01-27T07:00:00+07:00",
            "created_at": "2024-01-24T11:11:02.872356+07:00",
            "updated_at": "2024-02-03T05:57:05.395234+07:00"
        },
        "pagination": null,
        "error_message": null
    }

    return NextResponse.json(result, { status: 200 });
}
