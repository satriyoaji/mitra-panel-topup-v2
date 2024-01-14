"use client";
import CardProduct from "../flash-sale/flash-sale-card";
import { Button } from "@/components/ui/button";
import { IFlashSaleProduct } from "@/Type";
import Link from "next/link";
import { useEffect, useState } from "react";

// const CountdownCard = dynamic(() => import("./countdown-card"), { ssr: false });

async function FlashSale() {
    const [data, setData] = useState<IFlashSaleProduct[]>([]);

    async function getFlashSale() {
        var res = await fetch(
            `/api/flash-sales?` +
                new URLSearchParams({
                    page_num: "1",
                    page_size: "8",
                })
        );

        if (res.ok) {
            const dataJson = await res.json();
            setData(dataJson.data);
        }
    }

    useEffect(() => {
        (async () => {
            await getFlashSale();
        })();
    }, []);

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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundImage:
                            "linear-gradient(180deg, #f44336, #fff)",
                        borderRadius: 5,
                    }}
                    className="py-1"
                >
                    <div
                        className="no-scrollbar z-10 mb-2 pt-2 space-x-2 px-2"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            // marginLeft: "-.9rem",
                            // paddingLeft: "5rem",
                            overflowX: "auto",
                            scrollbarWidth: "none",
                        }}
                    >
                        {data.map((item, idx) => (
                            <div className="h-full min-w-[8rem]">
                                <CardProduct key={`${idx}`} data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
}

export default FlashSale;
