import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);

    var re = await fetch(`${process.env.NEXT_PUBLIC_API}/product-groups?`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    var result = await re.json();
    return NextResponse.json(result, { status: re.status });
}
