"use client";

import { Card } from "@/components/ui/card";
import { InfoCircledIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";
import { priceMask } from "@/Helpers";
import { Button } from "@/components/ui/button";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { ITransactionHistoryDetail } from "@/types/transaction";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import VAPayment from "./(payment)/va-payment";
import QRPayment from "./(payment)/qr-payment";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

function TransactionHistoryDetail({ id }: { id: string }) {
    const [data, setData] = useState<ITransactionHistoryDetail | undefined>(
        undefined
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            var re = await fetch(`/api/transaction/${id}`);

            var res = await re.json();
            setLoading(false);
            setData(res.data);
        })();
    }, [id]);

    const canRefund = () => {
        if (!data?.history_status) return false;
        const status = data.history_status.findLast((i) => true);
        return status?.status == 2 || status?.status == 3;
    };

    if (loading) return <Loading />;

    if (data)
        return (
            <div className="pt-4 mx-2 flex w-full justify-center">
                <div className="max-w-5xl w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <p className="font-medium ml-2 text-xl">
                                Detail Transaksi
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {data.transaction_code}
                            </p>
                            <CopyToClipboard text={data.transaction_code} />
                        </div>
                        {canRefund() && (
                            <Link href="/redeem-coupon">
                                <Button size="sm">Refund</Button>
                            </Link>
                        )}
                    </div>
                    <div className="w-full my-2">
                        <Alert className="bg-theme-primary-50 text-theme-primary-900">
                            <InfoCircledIcon className="text-white" />
                            <AlertTitle>Penting!</AlertTitle>
                            <AlertDescription className="text-xs">
                                Pastikan anda menyimpan nomor transaksi dan
                                email serta nomor telpon yang anda gunakan dalam
                                proses transaksi.
                            </AlertDescription>
                        </Alert>
                    </div>
                    <div className="flex flex-row justify-stretch items-center">
                        <div className="flex md:flex-row flex-col w-full gap-4 h-full mt-2">
                            <div className="w-full bg-background h-full p-4 rounded-lg shadow">
                                <p className="font-medium text-lg text-red-800">
                                    Rincian Transaksi
                                </p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Order Expired
                                        </p>
                                        <p className="font-semibold">12:23</p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Produk
                                        </p>
                                        <p className="">{data.category_name}</p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Item
                                        </p>
                                        <p className="">{data.product_name}</p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Informasi
                                        </p>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Status Pembayaran
                                        </p>
                                        <div>
                                            <Badge>Done</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Status Transaksi
                                        </p>
                                        <div>
                                            <Badge>Pending</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-muted-foreground">
                                            Informasi Kontak
                                        </p>
                                        <div className="text-right">
                                            <p>{data.email}</p>
                                            <p>{data.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-4 rounded-lg shadow bg-background">
                                <div>
                                    <p className="font-medium text-lg text-red-800">
                                        Rincian Pembayaran
                                    </p>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex justify-between w-full">
                                            <p className="text-muted-foreground">
                                                Pilihan Pembayaran
                                            </p>
                                            <div className="text-right">
                                                <p>
                                                    {`${data.payment_information.payment_method.replace(
                                                        "_",
                                                        " "
                                                    )} - ${
                                                        data.payment_information
                                                            .payment_channel
                                                    }`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-muted-foreground">
                                                Total Pembayaran
                                            </p>
                                            <p className="font-semibold text-green-600">
                                                {priceMask(
                                                    data.payment_information
                                                        .payment_amount
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Separator className="my-3 w-full" />
                                <div>
                                    <p className="font-medium text-lg text-red-800">
                                        Tujuan Pembayaran
                                    </p>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex justify-between w-full">
                                            <p className="text-muted-foreground">
                                                Pembayaran
                                            </p>
                                            <p className="font-semibold">
                                                {
                                                    data.payment_information
                                                        .virtual_account_number
                                                }
                                            </p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-muted-foreground">
                                                Pemiliki Akun Rekening a.n.
                                            </p>
                                            <p className="">
                                                {
                                                    data.payment_information
                                                        .virtual_account_name
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default TransactionHistoryDetail;
