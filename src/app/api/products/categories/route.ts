import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);
    const page_num = url.searchParams.get("page_num");
    const key = url.searchParams.get("key") ?? "";
    const group_id = url.searchParams.get("group_id");

    let params = new URLSearchParams({
        page_num: `${page_num ?? 1}`,
        page_size: "10",
        key: key,
        mitra_id: process.env.NEXT_MITRA_ID as string,
    });

    if (group_id) params.append("group_id", group_id);

    // var re: Response = new Response();
    // try {
    //     re = await fetch(
    //         `${process.env.NEXT_PUBLIC_API}/category?` + params,
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
        status: "SUCCESS",
        key: "0000",
        data: [
            {
                key: "Indosat-C",
                name: "INDOSAT",
                image_url:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVwx4rRHWJFMGhfj5HGs9I8KNIrsFhKiGMxFtBshmwrw&s",
                description: "",
            },
            {
                key: "GI",
                name: "Genshin Impact",
                image_url: "https://cdn-h2h.s3.ap-southeast-1.amazonaws.com/h2h/20230605141619_647dee3334998a1ad3f9fa51.webp",
                description: ""
            },
            {
                key: "MLBB",
                name: "MLBB",
                image_url: "https://cdn-h2h.s3.ap-southeast-1.amazonaws.com/h2h/20230602131243_6479eacb641a8ceb98b7111f.webp",
                description: ""
            },
            {
                key: "STEAM",
                name: "Steam IDR",
                image_url: "https://cdn-h2h.s3.ap-southeast-1.amazonaws.com/h2h/20230613045037_6487f59ddf8e6c9ddb5aa482.webp",
                description: ""
            },
            {
                key: "BossDomino-C",
                name: "Boss Domino",
                image_url: "",
                description: "",
            },
            {
                key: "ClashOfClans-C",
                name: "Clash of Clans",
                image_url:
                    "https://i.pinimg.com/originals/c2/70/3e/c2703edf67c47ace5fd2ce425827062d.png",
                description: "",
            },
            {
                key: "ClashRoyale-C",
                name: "Clash Royale",
                image_url:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWwCC6XWWY9iAAIkTyJkdliXjEGF8d2TJ22hTKOav6Q&s",
                description: "",
            },
            {
                key: "DragonRajaSea-C",
                name: "DRAGON RAJA - SEA",
                image_url: "",
                description: "",
            },
            {
                key: "EternalCity-C",
                name: "Eternal City",
                image_url:
                    "https://cdn-www.bluestacks.com/bs-images/xdg.and_.qrzd_.jpg",
                description: "",
            },
            {
                key: "AceRacer-C",
                name: "Ace Racer",
                image_url:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Y_DuJrwT_ReVcIJ3q_cBljm4GQAB6OzghrQhIrujNw&s",
                description: "",
            },
        ],
        manifest: {
            page: 1,
            limit: 10,
            total: 311,
        },
        error_message: null,
    };
    return NextResponse.json(result, { status: 200 });
}
