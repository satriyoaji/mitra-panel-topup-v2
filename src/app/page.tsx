import Carousel from "@/components/dashboard/carousel";
import FlashSale from "@/components/dashboard/flash-sale";
import ListGame from "@/components/dashboard/list-game";
import SaldoTier from "@/components/dashboard/saldo-tier";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
    return (
        <div className="mb-14">
            <SaldoTier />
            <Carousel />
            <FlashSale />
            <ListGame />
        </div>
    );
}
