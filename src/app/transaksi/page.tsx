"use client";
import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import ProductCard from "./[id]/product-card";
import TransactionStep from "./[id]/transaction-step";
import List, { TData } from "./list";

function Page() {
    const [selectedData, setSelectedData] = useState<TData | undefined>();

    return (
        <>
            <div className="md:hidden">
                <List onClick={setSelectedData} />
            </div>
            <div className="hidden md:block">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={66.6} minSize={50}>
                        <List onClick={setSelectedData} />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={33.3} minSize={33.3}>
                        {selectedData ? (
                            <div className="px-4 mt-12">
                                <h5 className="text-2xl font-bold">
                                    NDJKAS89DSA
                                </h5>
                                <hr className="mt-2 mb-4" />
                                <ProductCard />
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
