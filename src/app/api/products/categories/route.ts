import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../../api-utils";

export async function GET(req: NextRequest) {
    const url = new URL(req.url as string);
    const page_num = url.searchParams.get("page_num");
    const key = url.searchParams.get("key") ?? "";
    const group_id = url.searchParams.get("group_id");

    let params = new URLSearchParams({
        page_num: `${page_num ?? 1}`,
        page_size: "10",
        key: key,
        mitra_id: process.env.NEXT_MITRA_ID as string,
    });

    if (group_id) params.append("group_id", group_id);

    var re = await fetch(`${process.env.API}/category?` + params, {
        next: {
            revalidate: 30,
        },
        headers: GetAuthHeader(req),
    });
    var result = await re.json();

    return NextResponse.json(result, { status: re.status });
}
