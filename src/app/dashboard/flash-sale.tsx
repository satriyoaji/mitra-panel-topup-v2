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
            }),
        {
            cache: "no-store",
        }
    );

    if (res.ok) {
        const dataJson = await res.json();
        if (dataJson.data) return dataJson.data;
    }
    return [];
}

async function FlashSale() {
    const data: IFlashSaleProduct[] = await getFlashSale();

    if (data.length > 0)
        return (
            <div className="mt-6">
                <div className="flex justify-between md:justify-end">
                    <p className="px-2 font-semibold md:hidden">Flash Sale⚡</p>
                    <Link href="/flash-sale">
                        <Button size="sm" variant="link">
                            See More
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="md:flex flex-col items-center justify-center px-4 mx-4 hidden">
                        <h4 className="text-xl">⚡</h4>
                        <div className="flex flex-col">
                            <h3 className="text-4xl font-bold italic bg-theme-secondary text-theme-secondary-foreground px-3 py-2 -skew-x-12 z-10">
                                Flash
                            </h3>
                            <h3 className="text-4xl font-bold italic bg-theme-secondary text-theme-secondary-foreground p-3 -skew-x-12 -mt-4 w-fit">
                                Sale
                            </h3>
                        </div>
                    </div>
                    <div className="py-1 w-full flex rounded-lg bg-gradient-to-r from-theme-primary-900 to-theme-primary-200">
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
                                    className="h-full w-full min-w-[7.5rem] max-w-[15rem]"
                                    key={`${idx}`}
                                >
                                    <CardProduct data={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default FlashSale;
