import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

type prop = {
    avatar: string;
    title: string;
    link: string;
};

function CardProduct(props: prop) {
    return (
        <Link
            href="/games/weea"
            className="w-full h-full max-h-36 min-w-fit mx-2"
        >
            <Card className="h-full rounded-sm">
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
        </Link>
    );
}

export default CardProduct;
