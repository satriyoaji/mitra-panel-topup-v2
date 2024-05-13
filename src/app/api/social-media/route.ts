import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const url = new URL(req.url as string);
    const cookieStore = cookies();

    let qParams = url.searchParams;
    qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);

    // var re = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/admin/profile/socmed`,
    //     {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${cookieStore.get("mantapu")?.value}`,
    //         },
    //     }
    // );

    // var result = await re.json();
    var result = {
        "status": "SUCCESS",
        "code": "0000",
        "data": [
            {
                "id": 3,
                "created_at": "2023-12-16T22:30:50.934503+07:00",
                "updated_at": "2023-12-16T22:30:50.934503+07:00",
                "name": "X",
                "link": "http://www.x.com"
            },
            {
                "id": 2,
                "created_at": "2023-12-16T22:20:25.32085+07:00",
                "updated_at": "2023-12-16T22:20:25.32085+07:00",
                "name": "Instagram",
                "link": "http://www.instagram.com"
            }
        ],
        "pagination": null,
        "error_message": null
    }
    return NextResponse.json(result, { status: 200 });
}
