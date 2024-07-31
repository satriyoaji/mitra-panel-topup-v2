"use client";
import { useCountdown } from "@/Hooks";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { IVAPayment } from "@/types/transaction";
import React from "react";

function VAPayment({ payment }: { payment: IVAPayment }) {
  const { hours, minutes, seconds, isExpired } = useCountdown(
    payment.expired_at ?? ""
  );

  if (payment.virtual_account_number && !isExpired)
    return (
      <>
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">Pembayaran</p>
          <div className="flex items-center justify-end">
            <p className="font-semibold">{payment.virtual_account_number}</p>
            <CopyToClipboard text={payment.virtual_account_number} />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">Pemiliki Akun Rekening a.n.</p>
          <p className="">{payment.virtual_account_name}</p>
        </div>
      </>
    );
}

export default VAPayment;
