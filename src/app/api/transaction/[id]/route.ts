import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../../api-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  var re = await fetch(`${process.env.API}/transaction/detail/${params.id}`, {
    next: {
      revalidate: 30,
    },
    headers: GetAuthHeader(req),
  });
  var result = await re.json();
  console.log(result);
  console.log(`${process.env.API}/transaction/detail/${params.id}`);

  return NextResponse.json(result, { status: re.status });
}
