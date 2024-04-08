import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;

    var re = await fetch(
        `${process.env.NEXT_PUBLIC_API}/product-categories/${slug}?` +
            new URLSearchParams({
                mitra_id: process.env.NEXT_MITRA_ID as string,
            }),
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    var result = await re.json();
    return NextResponse.json(result, { status: re.status });
}
