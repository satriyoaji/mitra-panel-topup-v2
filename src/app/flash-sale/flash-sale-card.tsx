import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { LightningBoltIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import { IFlashSaleProduct } from "@/Type";
import { priceMask } from "@/Helpers";

function FlashSaleCard({
    data,
    selected,
}: {
    data: IFlashSaleProduct;
    selected?: boolean;
}) {
    return (
        <Link
            href={`/games/${data.product.category_uuid}?fs=${data.product.uuid}`}
            className="w-full h-fit"
        >
            <Card
                className={`h-full rounded-sm border-t-0 border-r-0 ${
                    selected && "border-4 border-theme-secondary"
                }`}
            >
                <div className="flex flex-row-reverse">
                    <div>
                        <div
                            style={{ fontSize: "65%" }}
                            className="text-xs bg-red-500 w-fit flex text-white font-semibold space-x-1 px-2 py-0.5 rounded-bl-lg rounded-tr"
                        >
                            <p>Hemat {priceMask(data?.discount_price)}</p>
                            <LightningBoltIcon />
                        </div>
                    </div>
                </div>
                <CardContent className="p-2 space-y-2 flex flex-col hover:bg-slate-50">
                    <div className="overflow-clip rounded w-full">
                        {/* {val.logo_image !== "" ? (
                                        <img
                                            alt="Remy Sharp"
                                            className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                            src={val.logo_image}
                                        />
                                    ) : ( */}
                        <div className="w-full h-full p-2 hover:scale-125 transition duration-300 hover:rotate-12">
                            <SketchLogoIcon className="text-zinc-400 w-[2rem] m-auto h-[2rem]" />
                        </div>
                        {/* )} */}
                    </div>
                    <div>
                        <p className="text-xs">{data.product.category_alias}</p>
                        <p className="text-xs font-semibold">
                            {data.product.product_name}
                        </p>
                    </div>
                    <div>
                        <p
                            className="line-through text-xs"
                            style={{ fontSize: "60%" }}
                        >
                            {priceMask(data.product.sale_price)}
                        </p>
                        <p
                            className="text-xs font-semibold text-red-500"
                            style={{ fontSize: "80%" }}
                        >
                            {priceMask(
                                data.product.sale_price - data.discount_price
                            )}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default FlashSaleCard;
