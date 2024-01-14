import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const url = new URL(req.url as string);
    const cookieStore = cookies();

    let qParams = url.searchParams;
    qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);

    var re = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/profile/socmed`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookieStore.get("mantapu")?.value}`,
            },
        }
    );

    var result = await re.json();
    return NextResponse.json(result, { status: re.status });
}
