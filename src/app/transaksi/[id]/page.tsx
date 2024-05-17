import React from "react";
import { Separator } from "@/components/ui/separator";
import TransactionStep from "./transaction-step";
import { Purchase } from "@/app/games/[slug]/(checkout)/detail";
import { transaction as data } from "./transaction";
import TransactionDetail from "@/components/transaction-detail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function DetailPage() {
    return (
        <div className="mt-4 mx-2">
            <p className="font-semibold ml-2 mb-2 text-lg">
                Detail Transaksi 📃
            </p>
            <hr className="my-2" />
            <div className="flex justify-between items-center mt-3">
                <div className="">
                    <h5 className="text-xl font-semibold ml-2">NDJKAS89DSA</h5>
                    <div>
                        <Badge variant="destructive">Failed</Badge>
                    </div>
                </div>
                <Link href="/redeem-coupon">
                    <Button size="sm">Refund</Button>
                </Link>
            </div>
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
