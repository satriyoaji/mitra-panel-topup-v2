import { priceMask } from "@/Helpers";
import { Badge } from "@/components/ui/badge";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CopyIcon } from "@radix-ui/react-icons";
import React from "react";

interface TDetail {
    // status: "success" | "on progress" | "failed";
    name: string;
    product: string;
    id: string;
    icon: string;
    price: number;
}

function Detail(props: TDetail) {
    return (
        <DialogContent className="sm:max-w-[25rem]">
            <DialogHeader>
                <DialogTitle>Invoice</DialogTitle>
                <DialogDescription>10:32:23, 23 October 2023</DialogDescription>
            </DialogHeader>
            <div className="py-2 flex gap-4">
                <div className="flex flex-col justify-center">
                    <img
                        alt="Remy Sharp"
                        className="rounded  border bg-card text-card-foreground shadow w-24"
                        src={props.icon}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-xs text-muted-foreground flex">
                        BDEU89EW{" "}
                        <CopyIcon
                            onClick={() =>
                                navigator.clipboard.writeText("BDEU89EW")
                            }
                            className="ml-2 cursor-pointer"
                        />
                    </p>
                    <p className="text-xl mt-2">{props.name}</p>
                    <p className="font-bold">{props.product}</p>
                    <p className="text-sm mt-3">
                        {priceMask(props.price, undefined)}
                    </p>
                </div>
            </div>
            <div className="grid gap-3 pt-2 pb-4">
                <div className="grid grid-cols-4 items-center gap-2">
                    <p className="text-xs">Transaksi</p>
                    <div className="col-span-3">
                        <Badge variant="destructive">Failed</Badge>
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                    <p className="text-xs">Pembayaran</p>
                    <div className="col-span-3">
                        <Badge variant="success">Success</Badge>
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                    <p className="text-xs">Claim</p>
                    <div className="col-span-3">
                        <Badge variant="warning">On Progress</Badge>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default Detail;
