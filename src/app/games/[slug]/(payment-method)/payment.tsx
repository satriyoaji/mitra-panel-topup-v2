import { nPlainFormatter } from "@/Helpers";
import { IBank, IXenditBank } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
    ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const bank: IBank[] = [
    {
        name: "Mandiri",
        url: "/Bank/Mandiri.PNG",
    },
    {
        name: "BTN",
        url: "/Bank/BTN.PNG",
    },
    {
        name: "BRI",
        url: "/Bank/BRI.PNG",
    },
    {
        name: "BNI",
        url: "/Bank/BNI.PNG",
    },
];

function Payment() {
    const { data, dispatch } = useContext(
        TransactionContext
    ) as ITransactionContext;
    const { data: session } = useSession();
    const [banks, setBanks] = useState<IXenditBank[]>([]);

    const getBank = async () => {
        var res = await fetch(`/api/xendit/banks`);

        if (res.ok) {
            const resData = await res.json();
            if (resData) {
                setBanks(resData);
                return;
            }
        }
    };

    useEffect(() => {
        if (data.payment == "transfer" || data.payment == "transfer & points")
            getBank();
    }, []);

    return (
        <Card className="w-full">
            <CardContent>
                <div className="flex mt-3">
                    <h4 className="font-semibold ml-1">Metode Pembayaran</h4>
                </div>
                <Separator className="my-3" />
                <div className="text-sm">
                    <div className="w-full border-4 border-theme-secondary rounded-lg px-4 mt-4">
                        <div className="flex justify-between items-center p-3">
                            <div className="flex items-center h-full gap-3">
                                <p className="font-semibold text-xl ml-2">🪙</p>
                                <p className="font-semibold">Points</p>
                            </div>
                            <p className="text-lg font-semibold">
                                {nPlainFormatter(10_000)} Points
                            </p>
                        </div>
                    </div>
                    <div className="w-full border-4 border-theme-secondary rounded-lg px-4 mt-2">
                        <div className="flex items-center h-full p-3 gap-2">
                            <p className="font-semibold text-3xl -mt-3">💳</p>
                            <p className="font-semibold">Transfer</p>
                        </div>
                        <hr />
                        {(data.payment == "transfer" ||
                            data.payment == "transfer & points") && (
                            <div className="my-4 grid grid-cols-2 gap-2">
                                {bank.map((item) => (
                                    <div
                                        className={`text-center flex flex-col justify-center items-center rounded-lg p-4 shadow cursor-pointer ${
                                            data.bank?.name == item.name
                                                ? "border-4 border-theme-secondary"
                                                : "border"
                                        }`}
                                        onClick={(e) => {
                                            dispatch({
                                                action: "SET_BANK",
                                                payload: item,
                                            });
                                        }}
                                    >
                                        <Image
                                            alt={item.name}
                                            src={item.url}
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                ))}
                                {/* <Label className="ml-1 mb-1">Bank VA *</Label>
                            <Combobox
                                className="mt-1"
                                data={banks.map((item) => ({
                                    value: item.code,
                                    label: item.name,
                                }))}
                                onChange={(e) => {
                                    dispatch({
                                        action: "SET_BANK",
                                        payload: banks.find(
                                            (i) => i.code == e.toUpperCase()
                                        ),
                                    });
                                }}
                            /> */}
                            </div>
                        )}
                    </div>
                    {session && <></>}
                </div>
            </CardContent>
        </Card>
    );
}

export default Payment;
