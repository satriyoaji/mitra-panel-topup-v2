import Carousel from "@/components/dashboard/carousel";
import FlashSale from "@/components/dashboard/flash-sale";
import ListGame from "@/components/dashboard/list-game";

export default function Home() {
    return (
        <div className="mb-14">
            <Card className="my-3">
                <div className="p-3 px-4">
                    <p className="text-xs font-semibold text-muted-foreground">
                        Saldo Point
                    </p>
                    <p className="font-bold">20.000 Point</p>
                </div>
            </Card>
            <Carousel />
            <FlashSale />
            <ListGame />
        </div>
    );
}
