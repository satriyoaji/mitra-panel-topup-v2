import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/member/change-password`,
    {
      headers: GetAuthHeader(req),
      next: {
        revalidate: 3600,
      },
    }
  );

  var result = await re.json();

  return NextResponse.json(result, { status: 200 });
}
