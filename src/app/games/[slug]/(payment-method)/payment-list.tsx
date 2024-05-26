import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import mandiri from "../../../../../public/Bank/Mandiri.png";
import bni from "../../../../../public/Bank/BNI.png";
import btn from "../../../../../public/Bank/BTN.png";
import bri from "../../../../../public/Bank/BRI.png";
import SelectedPayment from "./selected-payment";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { priceMask } from "@/Helpers";
import TransactionContext, {
    ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { IBank } from "@/Type";
import { group } from "console";

interface groupMethod {
    group: string;
    items: IBank[];
}

const paymentMethods: groupMethod[] = [
    {
        group: "Transfer Virtual Account",
        items: [
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
        ],
    },
    {
        group: "e-Wallet",
        items: [
            {
                name: "DANA",
                url: mandiri,
                admin_fee: 500,
            },
            {
                name: "OVO",
                url: btn,
                admin_fee: 1000,
            },
            {
                name: "Gopay",
                url: bri,
                admin_fee: 500,
            },
        ],
    },
];

function PaymentList() {
    const [isOpen, setIsOpen] = useState(false);
    const { data, dispatch } = useContext(
        TransactionContext
    ) as ITransactionContext;

    return (
        <>
            <SelectedPayment onClick={() => setIsOpen((val) => (val = !val))} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="py-8 px-0">
                    <DialogHeader className="px-8">
                        <DialogTitle>Metode Pembayaran</DialogTitle>
                        <DialogDescription>
                            Pilih salah satu metode pembayaran.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[56vh] overflow-y-scroll px-8 pb-8">
                        {paymentMethods.map((item) => (
                            <>
                                <p className="text-muted-foreground text-xs">
                                    {item.group}
                                </p>
                                <div className="mt-1.5 mb-4">
                                    {item.items.map((item) => (
                                        <>
                                            <div
                                                className={`text-center flex hover:bg-theme-secondary-50 justify-between items-center px-2 py-4 cursor-pointer`}
                                                onClick={(e) => {
                                                    dispatch({
                                                        action: "SET_BANK",
                                                        payload: item,
                                                    });
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <div className="md:flex items-center gap-4">
                                                    <Image
                                                        alt={item.name}
                                                        src={item.url}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <p className="text-xs mt-2 md:mt-0">
                                                        {item.name}
                                                    </p>
                                                </div>
                                                {item.admin_fee && (
                                                    <>
                                                        <p className="text-xs font-medium text-muted-foreground">
                                                            +
                                                            {priceMask(
                                                                item.admin_fee
                                                            )}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <Separator />
                                        </>
                                    ))}
                                </div>
                            </>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default PaymentList;
