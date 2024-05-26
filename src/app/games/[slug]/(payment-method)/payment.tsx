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
import SelectedPayment from "./selected-payment";
import PaymentList from "./payment-list";

const bank: IBank[] = [
    {
        name: "Mandiri Virtual Account",
        url: mandiri,
        admin_fee: 2500,
    },
    {
        name: "BTN Virtual Account",
        url: btn,
        admin_fee: 1500,
    },
    {
        name: "BRI Virtual Account",
        url: bri,
        admin_fee: 2500,
    },
    {
        name: "BNI Virtual Account",
        url: bni,
    },
];

function Payment() {
    const { data, dispatch } = useContext(
        TransactionContext
    ) as ITransactionContext;
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
                <PaymentList />
            </CardContent>
        </Card>
    );
}

export default Payment;
