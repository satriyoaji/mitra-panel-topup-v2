import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);
    const page_num = url.searchParams.get("page_num");
    const code = url.searchParams.get("code") ?? "";
    const group_id = url.searchParams.get("group_id");

    let params = new URLSearchParams({
        page_num: `${page_num ?? 1}`,
        page_size: "8",
        alias: code,
        mitra_id: process.env.NEXT_MITRA_ID as string,
    });

    if (group_id) params.append("group_id", group_id);

    var re: Response = new Response();
    try {
        re = await fetch(
            `${process.env.NEXT_PUBLIC_API}/product-categories?` + params,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (ex) {
        console.log(ex);
    }

    var result = await re.json();
    return NextResponse.json(result, { status: re.status });
}
