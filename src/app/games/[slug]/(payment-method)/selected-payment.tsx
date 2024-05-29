"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext } from "react";

function SelectedPayment({ onClick }: { onClick?: () => void }) {
  const { data } = useContext(TransactionContext) as ITransactionContext;
  const { data: session } = useSession();

  return (
    <div
      className="cursor-pointer rounded-lg hover:bg-slate-50 border-2 border-theme-secondary"
      role="button"
      onClick={() => onClick && onClick()}
    >
      <div className="py-4 px-6 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-full items-center">
            {data.bank ? (
              <>
                <p>🪙 Points</p>
                <Separator orientation="vertical" className="mx-4 h-10" />
                <div className="flex items-center gap-2">
                  {data.bank.image_url ? (
                    <Image
                      alt={data.bank.name}
                      src={data.bank.image_url}
                      width={70}
                      height={70}
                    />
                  ) : (
                    <p className="text-xl p-0 m-0 mb-1">💳</p>
                  )}
                  <p className="text-xs mt-0 p-0">{data.bank.name}</p>
                </div>
              </>
            ) : (
              <>
                <p>Pilih Metode Pembayaran</p>
              </>
            )}
          </div>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
}

export default SelectedPayment;
