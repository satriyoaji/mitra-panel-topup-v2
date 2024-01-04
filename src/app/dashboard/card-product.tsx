import React from "react";
import { Card, CardContent } from "../../components/ui/card";
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
            className="w-full min-w-[7rem] h-full max-h-36 mx-2"
        >
            <Card className="h-full rounded-sm">
                <CardContent className="p-1 space-y-2 flex flex-col items-center justify-center">
                    <div>
                        <p className="text-xs">FIFA 22</p>
                        <p className="text-xs font-semibold">2000 Coins</p>
                    </div>
                    <img
                        alt="Remy Sharp"
                        className="rounded-sm border bg-card text-card-foreground shadow w-12 object-cover"
                        src={props.avatar}
                    />
                    <div>
                        <p
                            className="line-through text-xs"
                            style={{ fontSize: "70%" }}
                        >
                            Rp 10.000
                        </p>
                        <p className="text-xs font-semibold text-red-500">
                            Rp 8.000
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CardProduct;
