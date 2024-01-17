import { Card, CardContent } from "@/components/ui/card";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import React from "react";

type prop = {
    selected?: boolean;
    onClick: () => void;
    name: string;
    price: string;
    discountPrice?: string | undefined;
    category: string;
};

function ProductCard(props: prop) {
    return (
        <Card
            className={`h-full hover:bg-slate-50 rounded-sm cursor-pointer ${
                props.selected && "border-4 border-black"
            }`}
            onClick={props.onClick}
        >
            <CardContent className="p-2 space-y-2 flex flex-col">
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
                    <p className="text-xs">{props.category}</p>
                    <p className="text-xs font-semibold">{props.name}</p>
                </div>
                <div>
                    {props.discountPrice ? (
                        <>
                            <p
                                className="line-through text-xs mt-0.5"
                                style={{ fontSize: "60%" }}
                            >
                                {props.price}
                            </p>
                            <p
                                className="text-red-500 text-xs font-semibold"
                                style={{ fontSize: "80%" }}
                            >
                                {props.discountPrice}
                            </p>
                        </>
                    ) : (
                        <p
                            className="text-xs font-semibold mt-0.5"
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
