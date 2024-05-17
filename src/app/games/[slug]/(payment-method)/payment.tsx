import { nPlainFormatter, priceMask } from "@/Helpers";
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
import mandiri from "../../../../../public/Bank/Mandiri.png";
import bni from "../../../../../public/Bank/BNI.png";
import btn from "../../../../../public/Bank/BTN.png";
import bri from "../../../../../public/Bank/BRI.png";

const bank: IBank[] = [
    {
        name: "Mandiri",
        url: mandiri,
        admin_fee: 2500,
    },
    {
        name: "BTN",
        url: btn,
        admin_fee: 1500,
    },
    {
        name: "BRI",
        url: bri,
        admin_fee: 2500,
    },
    {
        name: "BNI",
        url: bni,
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
                    <div className="w-full border shadow-sm rounded-lg px-4 mt-4">
                        <div className="flex justify-between items-center p-3">
                            <div className="flex items-center h-full gap-3">
                                <p className="font-semibold text-xl ml-2">🪙</p>
                                <p className="font-medium">Points</p>
                            </div>
                            <p className="text-lg font-medium">
                                {nPlainFormatter(10_000)} Points
                            </p>
                        </div>
                    </div>
                    <div className="w-full border shadow-sm rounded-lg px-4 mt-2">
                        <div className="flex items-center h-full p-3 gap-2">
                            <p className="font-semibold text-3xl -mt-3">💳</p>
                            <p className="font-medium">Transfer</p>
                        </div>
                        <hr />
                        {(data.payment == "transfer" ||
                            data.payment == "transfer & points") && (
                            <div className="my-4 grid grid-cols-2 gap-2">
                                {bank.map((item) => (
                                    <div
                                        className={`text-center flex flex-col md:flex-row justify-center md:justify-between items-center rounded-lg p-4 md:px-6 shadow cursor-pointer ${
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
                                        {item.admin_fee && (
                                            <>
                                                <Separator className="mb-2 mt-3 md:hidden" />
                                                <p className="text-xs font-medium text-muted-foreground">
                                                    +{priceMask(item.admin_fee)}
                                                </p>
                                            </>
                                        )}
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
