import { Card } from "@/components/ui/card";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import React from "react";

type prop = {
    selected?: boolean;
    onClick: () => void;
    name: string;
    price: string;
    discountPrice?: string | undefined;
};

function ProductCard(props: prop) {
    return (
        <Card
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
        </Card>
    );
}

export default ProductCard;
