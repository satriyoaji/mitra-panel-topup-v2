import CardProduct from "../flash-sale/flash-sale-card";
import { Button } from "@/components/ui/button";
import { IFlashSaleProduct } from "@/Type";
import Link from "next/link";

async function getFlashSale() {
    var res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/product-flash-sales?` +
            new URLSearchParams({
                page_num: "1",
                page_size: "8",
                mitra_id: process.env.NEXT_MITRA_ID as string,
            })
    );

    if (res.ok) {
        const dataJson = await res.json();
        return dataJson.data;
    }
    return [];
}

async function FlashSale() {
    const data: IFlashSaleProduct[] = await getFlashSale();

    if (data.length > 0)
        return (
            <div className="mt-6">
                <div className="flex justify-between">
                    <p className="px-2 font-bold">Flash Sale⚡</p>
                    <Link href="/flash-sale">
                        <Button size="sm" variant="link">
                            See More
                        </Button>
                    </Link>
                </div>
                <div className="py-1 flex rounded-lg bg-gradient-to-r from-orange-500 to-amber-300">
                    <div
                        className="no-scrollbar z-10 mb-2 pt-2 space-x-2 px-3"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            overflowX: "auto",
                            scrollbarWidth: "none",
                        }}
                    >
                        {data.map((item, idx) => (
                            <div
                                className="h-full w-full min-w-[7.5rem] max-w-[8rem]"
                                key={`${idx}`}
                            >
                                <CardProduct data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
}

export default FlashSale;
