import { nFormatter, nPlainFormatter } from "@/Helpers";
import Tier, { TierType } from "@/components/tier";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React from "react";

interface IHistory {
    amount: number;
    date: Date;
    type: "save" | "withdraw";
}

const history: IHistory[] = [
    {
        amount: 10_000,
        date: new Date(),
        type: "save",
    },
    {
        amount: 10_000,
        date: new Date(),
        type: "withdraw",
    },
    {
        amount: 20_000,
        date: new Date(),
        type: "save",
    },
];

function SaldoPointHistory() {
    const { data: session } = useSession();

    return (
        <>
            <div className="gap-2 grid text-sm">
                {history.map((item, i) => (
                    <div
                        key={i.toString()}
                        className="py-2 px-4 flex justify-between items-center bg-slate-50 border rounded-sm"
                    >
                        <div className="text-xs">
                            <p>TRX-DAS7319J221JDIU</p>
                            <p className="text-muted-foreground mt-1.5">
                                {format(item.date, "dd MMM yyy, hh:mm:ss")}
                            </p>
                        </div>
                        {item.type == "save" ? (
                            <p className="font-medium text-green-600">
                                + Rp {nPlainFormatter(item.amount)}
                            </p>
                        ) : (
                            <p className="font-medium text-red-500">
                                - Rp {nPlainFormatter(item.amount)}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default SaldoPointHistory;
