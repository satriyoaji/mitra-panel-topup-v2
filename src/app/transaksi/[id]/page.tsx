import React from "react";
import ProductCard from "./product-card";
import { Separator } from "@/components/ui/separator";

function DetailPage() {
    return (
        <div className="mt-4">
            <p className="font-semibold ml-2 mb-2">Detail Transaksi</p>
            <ProductCard />
        </div>
    );
}

export default DetailPage;
