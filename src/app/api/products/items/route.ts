import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);

    const strUrl = `${process.env.NEXT_PUBLIC_API}/products?mitra_id=${process.env.NEXT_MITRA_ID}&${url.searchParams}`;

    var re = await fetch(strUrl, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    var result = await re.json();
    return NextResponse.json(result, { status: re.status });
}
