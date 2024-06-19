import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;

    var re = await fetch(`${process.env.API}/production/detail/${slug}`, {
        headers: GetAuthHeader(req),
        next: {
            revalidate: 60,
        },
    });

    var result = await re.json();

    return NextResponse.json(result, { status: 200 });
}
