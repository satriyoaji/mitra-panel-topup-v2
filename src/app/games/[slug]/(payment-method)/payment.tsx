import { nPlainFormatter } from "@/Helpers";
import { IXenditBank } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
    ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

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
                <div className="flex items-center space-x-4 text-sm justify-center">
                    <div className="w-full border-4 border-black rounded-lg">
                        <div className="flex justify-center items-center h-full p-3">
                            <p className="font-semibold">Transfer VA</p>
                        </div>
                    </div>
                    {session && (
                        <>
                            <PlusIcon className="h-8 w-8" />
                            <div className="w-full border-4 border-black rounded-lg">
                                <div className="flex justify-center items-center h-full p-3">
                                    <p className="font-semibold">
                                        {nPlainFormatter(10_000)} Points
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {(data.payment == "transfer" ||
                    data.payment == "transfer & points") && (
                    <div className="mt-4">
                        <Label className="ml-1">Bank VA *</Label>
                        <Combobox
                            data={banks.map((item) => ({
                                value: item.code,
                                label: item.name,
                            }))}
                            onChange={(e) => {}}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default Payment;
