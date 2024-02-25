import FlashSale from "@/app/dashboard/flash-sale";
import ListGame from "@/app/dashboard/list-game";
import CarouselWrapper from "./dashboard/carousel-wrapper";
import Stats from "./dashboard/stats";

export default async function Home() {
    return (
        <div className="pt-2">
            <CarouselWrapper />
            <FlashSale />
            <ListGame />
            <div className="mt-8">
                <Stats />
            </div>
        </div>
    );
}
