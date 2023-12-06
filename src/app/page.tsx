import Carousel from "@/components/dashboard/carousel";
import FlashSale from "@/components/dashboard/flash-sale";
import ListGame from "@/components/dashboard/list-game";
import Tier from "@/components/tier";
import { Separator } from "@/components/ui/separator";

export default async function Home() {

    return (
        <div className="mb-14">
            <div className="flex space-x-4 mx-2 justify-between items-center">
                <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                        Saldo Point
                    </p>
                    <p className="font-extrabold">20.000 Point</p>
                </div>
                {/* <Separator orientation="vertical" className="mx-3 h-10" /> */}
                <Tier />
            </div>
            <Separator className="mb-3 mt-2" />
            <Carousel />
            <FlashSale />
            <ListGame />
        </div>
    );
}
