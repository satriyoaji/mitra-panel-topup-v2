import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function POST(req: NextRequest) {
  const response = await fetch(`${process.env.API}/member/register`, {
    method: "POST",
    headers: GetAuthHeader(req),
    body: JSON.stringify(await req.json()),
  });

  var result = await response.json();

  return NextResponse.json(result, { status: response.status });
}
