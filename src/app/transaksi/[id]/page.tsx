import React from "react";
import ProductCard from "./product-card";
import { Separator } from "@/components/ui/separator";
import TransactionStep from "./transaction-step";

function DetailPage() {
    return (
        <div className="mt-4 mx-2">
            <p className="font-semibold ml-2 mb-2">Detail Transaksi 📃</p>
            <ProductCard />
            <TransactionStep />
        </div>
    );
}

export default DetailPage;
