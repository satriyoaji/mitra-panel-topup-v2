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
        <>
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
                        <p
                            className="text-xs font-semibold"
                            style={{ fontSize: "70%" }}
                        >
                            {props.price}
                        </p>
                    </div>
                </CardContent>
            </Card>
            {/* <Card
                className={`p-2 flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50 ${
                    props.selected && "border-4 border-black"
                }`}
                onClick={props.onClick}
            >
                <SketchLogoIcon
                    width={30}
                    height={30}
                    className="text-center my-3"
                />
                <p className="text-sm text-center my-1">{props.name}</p>
                {props.discountPrice ? (
                    <>
                        <p className="line-through text-sm font-semibold mt-2">
                            {props.price}
                        </p>
                        <p className="text-red-500 text-sm font-semibold">
                            {props.discountPrice}
                        </p>
                    </>
                ) : (
                    <p className="text-sm font-semibold mt-2">{props.price}</p>
                )}
            </Card> */}
        </>
    );
}

export default ProductCard;
