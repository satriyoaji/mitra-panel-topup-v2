import { nFormatter, nPlainFormatter } from "@/Helpers";
import Tier, { TierType } from "@/components/tier";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React from "react";

interface IHistory {
  amount: number;
  date: Date;
  type: "save" | "withdraw";
}

const history: IHistory[] = [
  {
    amount: 10_000,
    date: new Date(),
    type: "save",
  },
  {
    amount: 10_000,
    date: new Date(),
    type: "withdraw",
  },
  {
    amount: 20_000,
    date: new Date(),
    type: "save",
  },
];

function SaldoPointHistory() {
  const { data: session } = useSession();

  const SaldoCard = () => (
    <>
      <div className="flex px-4 py-3 w-full rounded-xl justify-between gap-4 items-center bg-theme-secondary-50 border border-theme-secondary-100">
        <p className="text-sm text-theme-secondary-700">Saldo Points</p>
        <p className="font-medium text-theme-secondary-800">
          {session?.profile.saldo} Points
        </p>
      </div>
    </>
  );

  return (
    <>
      <Dialog>
        <DialogTrigger className="cursor-pointer hover:opacity-90 w-full">
          <SaldoCard />
        </DialogTrigger>
        <DialogContent>
          <div className="flex justify-center items-center mt-4">
            <SaldoCard />
          </div>
          <h5 className="text-lg font-semibold mt-2">Riwayat Transaksi</h5>
          <div className="gap-2 grid">
            {history.map((item, i) => (
              <div
                key={i.toString()}
                className="p-2 flex justify-between items-center bg-slate-50 border rounded-sm"
              >
                <div>{format(item.date, "dd MMM yyy")}</div>
                {item.type == "save" ? (
                  <p className="font-semibold text-green-600">
                    + Rp {nPlainFormatter(item.amount)}
                  </p>
                ) : (
                  <p className="font-semibold text-red-500">
                    - Rp {nPlainFormatter(item.amount)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SaldoPointHistory;
