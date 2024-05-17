"use client";
import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import TransactionStep from "./[id]/transaction-step";
import List, { TData } from "./list";
import TransactionDetail from "@/components/transaction-detail";
import { transaction as data } from "./[id]/transaction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
    const [selectedData, setSelectedData] = useState<TData | undefined>();

    return (
        <>
            <div className="md:hidden">
                <List onClick={setSelectedData} />
            </div>
            <div className="hidden md:block">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={60} minSize={50}>
                        <List onClick={setSelectedData} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={40} minSize={40}>
                        {selectedData ? (
                            <div className="px-4 mt-6">
                                <div className="flex justify-between items-center mt-3">
                                    <div className="">
                                        <p className="text-muted-foreground text-xs">
                                            Kode Transaksi
                                        </p>
                                        <h5 className="text-xl font-semibold">
                                            NDJKAS89DSA
                                        </h5>
                                        <div>
                                            <Badge variant="destructive">
                                                Failed
                                            </Badge>
                                        </div>
                                    </div>
                                    <Link href="/redeem-coupon">
                                        <Button size="sm">Refund</Button>
                                    </Link>
                                </div>
                                <TransactionDetail
                                    category={data.category}
                                    product={data.product}
                                    promo={data.promo}
                                    form={data.form}
                                    bank={data.bank}
                                />{" "}
                                <TransactionStep />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <Image
                                    src={
                                        "/illustration/DrawKit Larry Character Illustration (10).svg"
                                    }
                                    className="opacity-50"
                                    alt="dw"
                                    width={500}
                                    height={500}
                                />
                                <h5 className="text-xl font-bold">
                                    Pilih Riwayat Transaksi Anda
                                </h5>
                            </div>
                        )}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    );
}

export default Page;
