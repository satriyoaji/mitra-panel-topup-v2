import FlashSale from "@/app/dashboard/flash-sale";
import ListGame from "@/app/dashboard/list-game";
import SaldoTier from "@/app/dashboard/saldo-tier";
import CarouselWrapper from "./dashboard/carousel-wrapper";

export default async function Home() {
    return (
        <div className="pt-2">
            <SaldoTier />
            <CarouselWrapper />
            <FlashSale />
            <ListGame />
        </div>
    );
}
