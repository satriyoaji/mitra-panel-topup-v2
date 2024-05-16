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

    const SaldoCard = () => (
        <Card
            style={{
                backgroundImage: `url(/card.svg)`,
                backgroundSize: "cover",
            }}
            className="my-4 md:my-0 w-[20rem]"
            onClick={() => { }}
        >
            <div className="p-2 h-full bg-theme-secondary-500/70 rounded-lg">
                <div className="flex justify-end items-center">
                    <Tier
                        className="place-self-center m-3"
                        type={(session?.tier?.name as TierType) ?? "Public"}
                    />
                </div>
                <div className="w-full flex justify-end text-start items-end h-[7rem] mb-2">
                    <div className="w-full p-2">
                        <p className="font-bold text-theme-primary-200 text-xs">
                            Saldo Points
                        </p>
                        <p className="font-semibold text-xl text-theme-primary-100">
                            20.000 Points
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <div className="cursor-pointer hover:opacity-90">
                        <SaldoCard />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <div className="flex justify-center items-center">
                        <SaldoCard />
                    </div>
                    <h5 className="text-lg font-semibold mt-2">
                        Riwayat Transaksi
                    </h5>
                    <div className="gap-2 grid">
                        {history.map((item) => (
                            <div className="p-2 flex justify-between items-center bg-slate-50 border rounded-sm">
                                <div>{format(item.date, "dd MMM yyy")}</div>
                                {item.type == "save" ? (
                                    <p className="font-semibold text-green-600">
                                        + Rp {nPlainFormatter(item.amount)}
                                    </p>
                                ) : (
                                    <p className="font-semibold text-red-500">
                                        - Rp {nPlainFormatter(item.amount)}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SaldoPointHistory;
