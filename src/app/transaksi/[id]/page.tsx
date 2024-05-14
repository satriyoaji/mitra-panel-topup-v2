import React from "react";
import { Separator } from "@/components/ui/separator";
import TransactionStep from "./transaction-step";
import { Purchase } from "@/app/games/[slug]/(checkout)/detail";
import { transaction as data } from "./transaction";
import TransactionDetail from "@/components/transaction-detail";

function DetailPage() {
    return (
        <div className="mt-4 mx-2">
            <p className="font-semibold ml-2 mb-2 text-lg">
                Detail Transaksi 📃
            </p>
            <hr className="my-2" />
            <h5 className="text-xl font-semibold mt-3 ml-2 text-right">
                NDJKAS89DSA
            </h5>
            <div className="md:grid grid-cols-2 gap-10">
                <TransactionDetail
                    category={data.category}
                    product={data.product}
                    promo={data.promo}
                    form={data.form}
                    bank={data.bank}
                />
                <TransactionStep />
            </div>
        </div>
    );
}

export default DetailPage;
