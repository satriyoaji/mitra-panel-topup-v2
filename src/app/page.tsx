import FlashSale from "@/app/dashboard/flash-sale";
import ListGame from "@/app/dashboard/list-game/list-game";
import CarouselWrapper from "./dashboard/carousel/carousel-wrapper";
import Stats from "./dashboard/stats";
import Promo from "./dashboard/promo";

export default async function Home() {
  return (
    <>
      <div className="">
        <CarouselWrapper />
        <FlashSale />
        <ListGame />
        <div className="flex justify-center items-center">
          <Stats />
        </div>
      </div>
      <Promo />
    </>
  );
}
