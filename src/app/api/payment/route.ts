import { IPaymentGroup, IXenditBank } from "@/Type";
import { NextRequest, NextResponse } from "next/server";
import cryptojs from "crypto-js";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  var re = await fetch(`${process.env.API}/payment-method`, {
    headers: GetAuthHeader(req),
    next: {
      revalidate: 7200,
    },
  });
  var result: IPaymentGroup[] = await re.json();
  return NextResponse.json(result, { status: re.status });
}
