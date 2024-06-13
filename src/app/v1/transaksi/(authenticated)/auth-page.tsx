"use client";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import { ITransactionHistoryList } from "@/Type";
import TransactionHistoryDetail from "../[id]/transaction-detail";
import List from "./list";

function AuthPage() {
  const [selectedData, setSelectedData] = useState<
    ITransactionHistoryList | undefined
  >();

  return (
    <>
      <List onClick={setSelectedData} />
      {/* <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60} minSize={50} className="h-[100vh]">
          <List onClick={setSelectedData} />
        </ResizablePanel>
        <ResizableHandle className="hidden lg:block" />
        <ResizablePanel
          defaultSize={40}
          minSize={40}
          className="hidden lg:block h-[80vh]"
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
              <h5 className="text-xl font-bold">
                Pilih Riwayat Transaksi Anda
              </h5>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup> */}
    </>
  );
}

export default AuthPage;
