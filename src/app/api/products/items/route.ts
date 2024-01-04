import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);
    const page_num = url.searchParams.get("page_num") ?? "1";
    const page_size = url.searchParams.get("page_size") ?? "";
    const category_uuid = url.searchParams.get("category_uuid") ?? "";

    var re = await fetch(
        `${process.env.NEXT_PUBLIC_API}/products?` +
            new URLSearchParams({
                page_num,
                page_size,
                category_uuid,
                mitra_id: process.env.NEXT_MITRA_ID as string,
            }),
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );

    var result = await re.json();
    return NextResponse.json(result, { status: re.status });
}
