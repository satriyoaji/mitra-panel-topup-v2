import { nFormatter, nPlainFormatter } from "@/Helpers";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface IHistory {
    transaction_code: string;
    description: string;
    amount: number;
    created_at: string;
    // type: "save" | "withdraw";
}

// const history: IHistory[] = [
//     {
//         transaction_code: "TRX-2024628173218E676B28E",
//         amount: -2000,
//         created_at: "2024-06-28T10:29:41.246213Z",
//         description: "save",
//     },
//     {
//         transaction_code: "TRX-2024628162050B1DE57F2",
//         amount: 5000,
//         created_at: "2024-06-28T09:25:33.883189Z",
//         description: "withdraw",
//     },
//     {
//         transaction_code: "TRX-20246281625333512B7E3",
//         amount: -2000,
//         created_at: "2024-06-28T10:32:18.760145Z",
//         description: "save",
//     },
// ];

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
  }

    return (
        <>
            <div className="gap-2 grid text-sm">
                {balances.map((item, i) => (
                    <div
                        key={i.toString()}
                        className="py-2 px-4 flex justify-between items-center bg-slate-50 border rounded-sm"
                    >
                        <div className="text-xs">
                            <p>{item.transaction_code}</p>
                            <p className="text-muted-foreground mt-1.5">
                                {format(new Date(item.created_at), "dd MMM yyy, HH:mm:ss")}
                            </p>
                        </div>
                        {item.amount < 0 ? (
                            <p className="font-medium text-red-500">
                            - Rp {nPlainFormatter(Math.abs(item.amount))}
                        </p>
                        ) : (
                            <p className="font-medium text-green-600">
                                + Rp {nPlainFormatter(item.amount)}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default SaldoPointHistory;
