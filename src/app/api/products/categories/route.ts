import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);
    const page_num = url.searchParams.get("page_num");
    const code = url.searchParams.get("code") ?? "";
    const group_id = url.searchParams.get("group_id");

    let params = new URLSearchParams({
        page_num: `${page_num ?? 1}`,
        page_size: "8",
        alias: code,
        mitra_id: process.env.NEXT_MITRA_ID as string,
    });

    if (group_id) params.append("group_id", group_id);

    // var re: Response = new Response();
    // try {
    //     re = await fetch(
    //         `${process.env.NEXT_PUBLIC_API}/product-categories?` + params,
    //         {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    // } catch (ex) {
    //     console.log(ex);
    // }

    // var result = await re.json();
    
    var result = {
        "status": "SUCCESS",
        "code": "0000",
        "data": [
            {
                "uuid": "4c0af17a-9883-4f6c-9b78-da1a5d03f84b",
                "code": "Indosat-C",
                "alias": "INDOSAT",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "0e29c458-90ee-48ab-93e7-2900f1301759",
                "code": "BigoLive-C",
                "alias": "Bigo Live",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "75ffff09-b403-427c-bb1f-cd2d3f6de812",
                "code": "BattleNetGiftCard-C",
                "alias": "Battle Net Gift Card",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "fc649b36-5482-4841-9827-aeb58556a371",
                "code": "BrawlStars-C",
                "alias": "Brawl Stars",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "f1f29c89-12e4-4721-8994-f018f3ca6b9b",
                "code": "BossDomino-C",
                "alias": "Boss Domino",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "0b7f01ee-ba5a-4e85-9955-a79482788b2d",
                "code": "ClashOfClans-C",
                "alias": "Clash of Clans",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "28d2e4ae-1ea7-4e45-a174-f2dafa64d736",
                "code": "ClashRoyale-C",
                "alias": "Clash Royale",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "dca60bb2-1ba1-4445-8729-b461de2729af",
                "code": "DragonRajaSea-C",
                "alias": "DRAGON RAJA - SEA",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "650ac0e7-848e-42ad-9b52-81037a94ce36",
                "code": "EternalCity-C",
                "alias": "Eternal City",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            },
            {
                "uuid": "df27d15e-b968-44fb-93d4-0eebbfb9472a",
                "code": "AceRacer-C",
                "alias": "Ace Racer",
                "status": 2,
                "banner_image": "",
                "logo_image": "",
                "description": ""
            }
        ],
        "pagination": {
            "page_num": 1,
            "page_size": 10,
            "total_data": 311
        },
        "error_message": null
    }
    return NextResponse.json(result, { status: 200 });
}
