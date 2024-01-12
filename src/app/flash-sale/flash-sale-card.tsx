import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { SketchLogoIcon } from "@radix-ui/react-icons";
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
            href={`/flash-sale/${data.id}`}
            className="sm:min-w-[7rem] w-full max-w-[7rem] sm:max-w-[9rem]  h-fit"
        >
            <Card
                className={`h-full rounded-sm ${
                    selected && "border-4 border-black"
                }`}
            >
                <CardContent className="p-2 space-y-2 flex flex-col hover:bg-slate-50">
                    <div className="overflow-clip rounded w-full bg-slate-200">
                        {/* {val.logo_image !== "" ? (
                                        <img
                                            alt="Remy Sharp"
                                            className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                            src={val.logo_image}
                                        />
                                    ) : ( */}
                        <div className="w-full h-full p-2 hover:scale-125 transition duration-300 hover:rotate-12">
                            <SketchLogoIcon className="text-white w-[5rem] m-auto h-[5rem]" />
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
                            style={{ fontSize: "70%" }}
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
