import FlashSaleWrapper from "@/app/dashboard/flash-sale/flash-sale-wrapper";
import ListGame from "@/app/dashboard/list-game/list-game";
import CarouselWrapper from "./dashboard/carousel/carousel-wrapper";
import Promo from "./dashboard/promo";

export default function Home() {
  return (
    <>
      <div className="bg-background">
        <CarouselWrapper />
        <FlashSaleWrapper />
        <ListGame />
      </div>
      <Promo />
    </>
  );
}
