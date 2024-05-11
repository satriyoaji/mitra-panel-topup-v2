import { IBanner } from "@/Type";
import Carousel from "./carousel";

const getData = async () => {
    var res = await fetch(
        `${process.env.API}/all-banners?` +
            new URLSearchParams({
                page_num: "1",
                page_size: "10",
                mitra_id: process.env.NEXT_MITRA_ID as string,
            }),
        {
            next: {
                revalidate: 60,
            },
        }
    );
    if (res.ok) {
        var data = await res.json();

        if (data.data) return data.data;
    }
    return [];
};

const CarouselWrapper = async () => {
    const data: IBanner[] = await getData();

    if (data && data.length > 0) return <Carousel data={data} />;
};

export default CarouselWrapper;
