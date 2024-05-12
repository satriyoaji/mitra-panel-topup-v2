import React from "react";
import ProductCard from "./product-card";
import { Separator } from "@/components/ui/separator";
import TransactionStep from "./transaction-step";

function DetailPage() {
    return (
        <div className="mt-4 mx-2">
            <p className="font-semibold ml-2 mb-2 text-lg">
                Detail Transaksi 📃
            </p>
            <hr className="my-2" />
            <h5 className="text-2xl font-bold mb-2 mt-3 ml-2">NDJKAS89DSA</h5>
            <div className="md:grid grid-cols-2 gap-4">
                <ProductCard />
                <TransactionStep />
            </div>
        </div>
    );
}

export default DetailPage;
