"use client";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import TransactionStep from "./[id]/transaction-step";
import List from "./list";
import TransactionDetail from "@/components/transaction-detail";
import { transaction as data } from "./[id]/transaction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITransactionHistory, ITransactionHistoryList } from "@/Type";
import TransactionHistoryDetail from "./[id]/transaction-detail";

function Page() {
  const [selectedData, setSelectedData] = useState<
    ITransactionHistoryList | undefined
  >();
  console.log(selectedData);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={60} minSize={50} className="h-[100vh]">
        <List onClick={setSelectedData} />
      </ResizablePanel>
      <ResizableHandle className="hidden md:block" />
      <ResizablePanel
        defaultSize={40}
        minSize={40}
        className="hidden md:block h-[80vh]"
      >
        {selectedData ? (
          <div className="px-4 mt-6">
            <TransactionHistoryDetail id={selectedData.transaction_code} />
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
            <h5 className="text-xl font-bold">Pilih Riwayat Transaksi Anda</h5>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Page;
