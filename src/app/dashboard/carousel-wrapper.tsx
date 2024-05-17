import { IBanner } from "@/Type";
import Carousel from "./carousel";

const getData = async () => {
    // var res = await fetch(
    //     `${process.env.API}/all-banners?` +
    //         new URLSearchParams({
    //             page_num: "1",
    //             page_size: "10",
    //             mitra_id: process.env.NEXT_MITRA_ID as string,
    //         }),
    //     {
    //         next: {
    //             revalidate: 60,
    //         },
    //     }
    // );
    // if (res.ok) {
    //     var data = await res.json();

    //     if (data.data) return data.data;
    // }
    // return [];

    return [
        {
            id: 1,
            created_at: "2024-01-17T06:52:22.054715+07:00",
            updated_at: "2024-01-17T06:56:10.357787+07:00",
            title: "Banner new",
            path: "https://cdn.vcgamers.com/news/wp-content/uploads/2022/08/Kode-Promo-VCGArmy.png",
        },
        {
            id: 2,
            created_at: "2024-01-17T06:52:22.054715+07:00",
            updated_at: "2024-01-17T06:56:10.357787+07:00",
            title: "Banner new 2",
            path: "https://storage.googleapis.com/cdn.vcgamers.com/news/wp-content/uploads/2023/10/VCGamers-x-Gopay-All-Brand.png",
        },
        {
            id: 3,
            created_at: "2024-01-17T06:52:22.054715+07:00",
            updated_at: "2024-01-17T06:56:10.357787+07:00",
            title: "Banner new 2",
            path: "https://cdn.vcgamers.com/news/wp-content/uploads/2023/07/26Jun_VCGamers-Bebas-Biaya-Admin-Free-Payment-Fee-1144x640.png",
        },
    ];
};

const CarouselWrapper = async () => {
    const data: IBanner[] = await getData();

    if (data && data.length > 0) return <Carousel data={data} />;
};

export default CarouselWrapper;
