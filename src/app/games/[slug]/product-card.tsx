import { Card } from "@/components/ui/card";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import React from "react";

type prop = {
    selected?: boolean;
    onClick: () => void;
};

function ProductCard(props: prop) {
    return (
        <Card
            className={`p-2 flex flex-col justify-center items-center cursor-pointer ${
                props.selected && "border-4 border-black"
            }`}
            onClick={props.onClick}
        >
            <SketchLogoIcon
                width={30}
                height={30}
                className="text-center my-3"
            />
            <p className="text-sm">20.000</p>
            <p className="text-xs mb-2">Diamonds</p>
            <p className="line-through">Rp 15.000</p>
            <p className="text-red-500">Rp 10.000</p>
        </Card>
    );
}

export default ProductCard;
