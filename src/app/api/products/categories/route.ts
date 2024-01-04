import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);
    const page_num = url.searchParams.get("page_num");
    const code = url.searchParams.get("code") ?? "";

    var re = await fetch(
        `${process.env.NEXT_PUBLIC_API}/product-categories?` +
            new URLSearchParams({
                page_num: `${page_num ?? 1}`,
                page_size: "8",
                code,
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
