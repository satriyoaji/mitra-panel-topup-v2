import React from "react";
import { Card, CardContent } from "../ui/card";

type prop = {
    avatar: string;
    title: string;
    link: string;
};

function CardProduct(props: prop) {
    return (
        <Card className="w-full h-full max-h-36 min-w-fit mx-2 rounded-sm">
            <CardContent className="p-1">
                <img
                    alt="Remy Sharp"
                    className="rounded"
                    src={props.avatar}
                    style={{
                        width: 80,
                    }}
                />
            </CardContent>
        </Card>
    );
}

export default CardProduct;
