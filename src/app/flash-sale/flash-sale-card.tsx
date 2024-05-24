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
            className="w-full h-full"
        >
            <Card
                className={`min-h-[6rem] h-full hover:bg-slate-50 rounded-sm border-t-0 border-r-0 ${
                    selected ? "border-4 border-theme-secondary" : ""
                }`}
            >
                <div className="p-0 flex flex-col m-0 h-full">
                    {/* <div className="flex flex-row-reverse">
                        <div>
                            <div
                                style={{ fontSize: "65%" }}
                                className="text-xs bg-red-500 w-fit flex text-white font-semibold space-x-1 px-2 py-0.5 rounded-bl-lg rounded-tr"
                            >
                                <p>Hemat {priceMask(data?.discount_price)}</p>
                                <LightningBoltIcon />
                            </div>
                        </div>
                    </div> */}
                    <div className="p-3 flex flex-col justify-between h-full items-start">
                        <div className="flex space-x-0.5">
                            <div className="overflow-clip rounded w-fit min-w-[2rem]">
                                {/* {val.logo_image !== "" ? (
                                            <img
                                                alt="Remy Sharp"
                                                className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                                src={val.logo_image}
                                            />
                                        ) : ( */}
                                <div className="p-1 aspect-square hover:scale-125 transition duration-300 hover:rotate-12 flex justify-center items-center">
                                    <SketchLogoIcon className="m-auto w-5 h-5" />
                                </div>
                                {/* )} */}
                            </div>
                            <p className="text-xs">
                                {data.product.product_name}
                            </p>
                        </div>
                        <div className="mx-2 w-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p
                                        className="line-through text-xs mt-0.5"
                                        style={{ fontSize: "60%" }}
                                    >
                                        {priceMask(data.product.sale_price)}
                                    </p>
                                    <p
                                        className="text-red-500 text-xs font-medium"
                                        style={{ fontSize: "80%" }}
                                    >
                                        {priceMask(
                                            data.product.sale_price -
                                                data.discount_price
                                        )}
                                    </p>
                                </div>
                                <div className="bg-red-500 text-white -mb-[.562rem] rounded-br-md rounded-tl-md p-1">
                                    <LightningBoltIcon />
                                </div>
                            </div>
                            {/* <p
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
                                    data.product.sale_price -
                                        data.discount_price
                                )}
                            </p> */}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default FlashSaleCard;
