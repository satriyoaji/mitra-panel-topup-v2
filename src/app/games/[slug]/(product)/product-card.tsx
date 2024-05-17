import { Card, CardContent } from "@/components/ui/card";
import {
    IdCardIcon,
    LightningBoltIcon,
    SketchLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";

type productType = undefined | "flash-sale" | "promo";

type prop = {
    selected?: boolean;
    onClick: () => void;
    name: string;
    price: string;
    discountPrice?: string | undefined;
    discount?: string | undefined;
    category: string;
    type?: productType;
};

function ProductCard(props: prop) {
    return (
        <Card
            className={`h-full hover:bg-slate-50 rounded-lg cursor-pointer ${
                props.selected && "border-4 border-theme-secondary"
            }`}
            onClick={props.onClick}
        >
            {props.discount && (
                <div className="flex flex-row-reverse">
                    <div>
                        <div
                            style={{ fontSize: "65%" }}
                            className="text-xs bg-red-500 w-fit flex text-white font-semibold space-x-1 px-2 py-0.5 rounded-bl-lg rounded-tr-md"
                        >
                            <p>Hemat {props?.discount}</p>
                            <LightningBoltIcon />
                        </div>
                    </div>
                </div>
            )}
            <CardContent className="p-2 space-y-2 flex flex-col justify-center h-full">
                <div className="flex space-x-0.5 items-center">
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
                    <p className="text-xs">{props.name}</p>
                </div>
                <div className="mx-2">
                    {props.discountPrice ? (
                        <div className="mb-3">
                            <p
                                className="line-through text-xs mt-0.5"
                                style={{ fontSize: "60%" }}
                            >
                                {props.price}
                            </p>
                            <p
                                className="text-red-500 text-xs font-medium"
                                style={{ fontSize: "80%" }}
                            >
                                {props.discountPrice}
                            </p>
                        </div>
                    ) : (
                        <p
                            className="text-xs font-medium mt-0.5"
                            style={{ fontSize: "80%" }}
                        >
                            {props.price}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
