import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);

  let qParams = url.searchParams;

  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/flash-sale/products?` + qParams,
    {
      headers: GetAuthHeader(req),
      next: {
        revalidate: 5,
      },
    }
  );

  var result = await re.json();
  return NextResponse.json(result, { status: 200 });
}
