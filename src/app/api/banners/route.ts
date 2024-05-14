import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const url = new URL(req.url as string);
    const cookieStore = cookies();

    let qParams = url.searchParams;
    qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);

    // var re = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/all-banners?` + qParams,
    //     {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             // Authorization: `Bearer ${cookieStore.get("mantapu")?.value}`,
    //         },
    //     }
    // );

    // var result = await re.json();
    var result = {
        status: "SUCCESS",
        code: "0000",
        data: [
            {
                id: 1,
                created_at: "2024-01-17T06:52:22.054715+07:00",
                updated_at: "2024-01-17T06:56:10.357787+07:00",
                title: "Banner new",
                path: "https://cdn-panel.vcg.my.id/banners/mitra/1/1708978773-a4tcRqOYsVttBfCA.webp"
            }
        ],
        pagination: null,
        error_message: null
    }
    return NextResponse.json(result, { status: 200 });
}
