import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const url = new URL(req.url as string);

    let qParams = url.searchParams;
    qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);

    var re = await fetch(
        `${process.env.NEXT_PUBLIC_API}/product-promos?` + qParams,
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
