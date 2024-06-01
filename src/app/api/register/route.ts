import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function POST(req: NextRequest) {
    // console.log(JSON.stringify(await req.json()));
    const response = await fetch(`${process.env.API}/member/register`, {
        method: "POST",
        headers: GetAuthHeader(req),
        body: JSON.stringify(await req.json()),
    });

    var result = await response.json();

    console.log("RESULT", result);
    return NextResponse.json(result, { status: response.status });
}
