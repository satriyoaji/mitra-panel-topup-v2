"use client";
import { Button } from "@/components/ui/button";
import { ILinkPayment } from "@/types/transaction";
import { useRouter } from "next/navigation";
import React from "react";

function LinkPayment({ payment }: { payment: ILinkPayment }) {
  const router = useRouter();

  return (
    <>
      <div className="w-full">
        <p className="text-muted-foreground w-full">
          Klik tombol untuk link pembayaran
        </p>
        {payment.deeplink_url ? (
          <Button
            className="w-full bg-green-500 text-white mt-2"
            onClick={() => router.push(payment.deeplink_url)}
          >
            Bayar Sekarang
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default LinkPayment;
