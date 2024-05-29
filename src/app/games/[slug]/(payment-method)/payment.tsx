'use client'

import { nPlainFormatter, priceMask } from "@/Helpers";
import { IBank, IPaymentGroup, IXenditBank } from "@/Type";
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
import PaymentList from "./payment-list";


function Payment() {
    const { data, dispatch } = useContext(
        TransactionContext
    ) as ITransactionContext;
    const [paymentGroups, setPaymentGroups] = useState<IPaymentGroup[]>([]);

    const getBank = async () => {
        var res = await fetch(`/api/payment`);

        if (res.ok) {
            const resData = await res.json();
            if (resData) {
                setPaymentGroups(resData.data);
                return;
            }
        }
    };

    console.log(paymentGroups)

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
                <PaymentList paymentGroup={paymentGroups} />
            </CardContent>
        </Card>
    );
}

export default Payment;
