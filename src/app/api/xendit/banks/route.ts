import { IXenditBank } from "@/Type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    var re = await fetch(
        `${process.env.XENDIT_URL}/available_virtual_account_banks`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${process.env.XENDIT_BASIC}`,
            },
        }
    );

    var result: IXenditBank[] = await re.json();
    return NextResponse.json(
        result.filter((i) => i.is_activated && i.country == "ID"),
        { status: re.status }
    );
}
