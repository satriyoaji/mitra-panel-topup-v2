import CardProduct from "../flash-sale/flash-sale-card";
import { Button } from "@/components/ui/button";
import { IFlashSaleProduct } from "@/Type";
import Link from "next/link";

async function getFlashSale() {
    // var res = await fetch(
    //     `${process.env.API}/product-flash-sales?` +
    //         new URLSearchParams({
    //             page_num: "1",
    //             page_size: "8",
    //             mitra_id: process.env.NEXT_MITRA_ID as string,
    //         }),
    //     {
    //         cache: "no-store",
    //     }
    // );

    // if (res.ok) {
    //     const dataJson = await res.json();
    //     if (dataJson.data) return dataJson.data;
    // }
    // return [];
    return [
        {
            id: 6,
            created_at: "2024-01-06T05:26:16.204836+07:00",
            updated_at: "2024-01-06T05:26:16.204836+07:00",
            product: {
                uuid: "3dcd16cb-e78b-425c-8356-e3250b5e7a0c",
                product_sku: "ISATTRF50",
                product_name: "Indosat Pulsa Transfer 50.000",
                sale_price: 59876,
                category_uuid: "4c0af17a-9883-4f6c-9b78-da1a5d03f84b",
                category_alias: "INDOSAT",
                category_code: "Indosat-C",
                active: true,
                group_name: "Pulsa Provider",
            },
            discount_price: 1000,
            start_at: "2023-05-06T07:00:00+07:00",
            finish_at: "2023-05-07T07:00:00+07:00",
            active: true,
        },
        {
            id: 4,
            created_at: "2024-01-06T05:07:03.974191+07:00",
            updated_at: "2024-01-06T05:24:24.814001+07:00",
            product: {
                uuid: "c72be282-1175-401d-a885-a429ed952b47",
                product_sku: "GSIXBWM",
                product_name: "Genshin Impact Blessing of the Welkin Moon",
                sale_price: 71102.8,
                category_uuid: "105204e8-4235-4c0c-82ea-764db1089703",
                category_alias: "Genshin Impact",
                category_code: "GenshinImpact-C",
                active: true,
                group_name: "Trial",
            },
            discount_price: 2000,
            start_at: "2023-05-07T07:00:00+07:00",
            finish_at: "2023-05-08T07:00:00+07:00",
            active: true,
        },
    ];
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
                    <div
                        style={{ backgroundImage: 'url("/thunder.svg")' }}
                        className="w-full bg-cover rounded-lg"
                    >
                        <div className="py-1 w-full flex rounded-lg bg-gradient-to-r from-theme-primary-900/95 to-theme-primary-200/70">
                            <div
                                className="gap-3 p-3"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    overflowX: "auto",
                                    scrollbarWidth: "none",
                                }}
                            >
                                {data.map((item, idx) => (
                                    <div
                                        className="h-full w-full min-w-[7.5rem] max-w-[11.5rem]"
                                        key={`${idx}`}
                                    >
                                        <CardProduct data={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default FlashSale;
