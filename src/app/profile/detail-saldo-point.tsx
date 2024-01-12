import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CardStackMinusIcon, CardStackPlusIcon } from "@radix-ui/react-icons";
import React from "react";

function DetailSaldoPoint() {
    return (
        <>
            <Card className="mt-4">
                <div className="grid p-1 grid-cols-2 gap-4">
                    <div className="hover:bg-zinc-100 w-full p-2 rounded-xl">
                        <p className="font-bold text-muted-foreground text-xs">
                            Saldo Points
                        </p>
                        <p className="font-bold">20.000 Points</p>
                    </div>
                </div>
            </Card>
            <Separator className="my-2" />
            <div className="space-y-2 px-6">
                <div className="p-3 rounded-sm flex justify-between items-center">
                    <div className="flex space-x-4 items-center">
                        <CardStackMinusIcon className="w-8 h-8 text-zinc-300" />
                        <div>
                            <h4 className="text-lg font-bold">Transaksi</h4>
                            <h4 className="text-xs font-semibold text-muted-foreground">
                                23 Oktober 2023
                            </h4>
                        </div>
                    </div>
                    <h3 className="text-lg font-extrabold text-red-600">
                        - 20.000
                    </h3>
                </div>
                <Separator className="my-1" />
                <div className="p-3 rounded-sm flex justify-between items-center">
                    <div className="flex space-x-4 items-center">
                        <CardStackPlusIcon className="w-8 h-8 text-zinc-300" />
                        <div>
                            <h4 className="text-lg font-bold">Klaim Kupon</h4>
                            <h4 className="text-xs font-semibold text-muted-foreground">
                                23 Oktober 2023
                            </h4>
                        </div>
                    </div>
                    <h3 className="text-lg font-extrabold text-green-600">
                        + 20.000
                    </h3>
                </div>
            </div>
        </>
    );
}

export default DetailSaldoPoint;
