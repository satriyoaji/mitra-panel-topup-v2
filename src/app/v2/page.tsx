import FlashSale from "@/app/v1/dashboard/flash-sale";
import ListGame from "@/app/v1/dashboard/list-game";
import CarouselWrapper from "../v1/dashboard/carousel-wrapper";
import Stats from "../v1/dashboard/stats";
import Promo from "../v1/dashboard/promo";

export default async function Home() {
  return (
    <>
      <div className="pt-2">
        <CarouselWrapper />
        <FlashSale />
        <ListGame />
        <div className="mt-8 flex justify-center items-center">
          <Stats />
        </div>
      </div>
      <Promo />
    </>
  );
}
