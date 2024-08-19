"use client";

import { nPlainFormatter } from "@/Helpers";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IHistory {
  transaction_code: string;
  description: string;
  amount: number;
  created_at: string;
}

function SaldoPointHistory() {
  const [balances, setBalances] = useState<IHistory[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var res = await fetch(`/api/profile/balance-history`);
    if (res.ok) {
      var result = await res.json();
      if (result.data) {
        setBalances(result.data);
      }
    }
  };

  return (
    <>
      <div className="gap-3 grid text-sm overflow-y-auto">
        {balances.map((item, i) => (
          <Link
            href={`/transaksi/${item.transaction_code}`}
            className="cursor-pointer"
            key={i.toString()}
          >
            <Card className="py-3 px-4 flex flex-col hover:bg-slate-50">
              <div className="flex justify-between items-center">
                <p className="text-xs">{item.transaction_code}</p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {format(new Date(item.created_at), "dd MMM yyy, HH:mm")}
                </p>
              </div>
              <div className="flex justify-between items-center mt-1">
                {item.amount < 0 ? (
                  <p className="font-medium text-red-500">
                    -Rp {nPlainFormatter(Math.abs(item.amount))}
                  </p>
                ) : (
                  <div className="flex items-center gap-4">
                    <p className="font-medium">
                      +Rp {nPlainFormatter(item.amount)}
                    </p>
                    <p className="text-green-500 font-medium">Refund</p>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SaldoPointHistory;
