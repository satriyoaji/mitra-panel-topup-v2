import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // const url = new URL(req.url as string);

    // var re = await fetch(`${process.env.NEXT_PUBLIC_API}/product-groups?`, {
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    // });

    // var result = await re.json();

    var result = {
        "status": "SUCCESS",
        "code": "0000",
        "data": [
            {
                "id": 4,
                "created_at": "2023-12-26T22:13:46.830341+07:00",
                "updated_at": "2023-12-26T22:13:46.830341+07:00",
                "name": "Pulsa Token"
            },
            {
                "id": 3,
                "created_at": "2023-12-26T22:13:08.542726+07:00",
                "updated_at": "2023-12-26T22:13:08.542726+07:00",
                "name": "Pulsa Provider"
            },
            {
                "id": 2,
                "created_at": "2023-12-26T21:51:43.90194+07:00",
                "updated_at": "2023-12-26T21:52:20.665417+07:00",
                "name": "Topup Balance Game"
            },
            {
                "id": 1,
                "created_at": "2023-12-26T21:50:21.658466+07:00",
                "updated_at": "2023-12-26T21:50:21.658466+07:00",
                "name": "Trial"
            }
        ],
        "pagination": null,
        "error_message": null
    }

    return NextResponse.json(result, { status: 200 });
}
