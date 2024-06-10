import React from "react";
import { ITransactionHistoryDetail } from "@/Type";
import TransactionHistoryDetail from "./transaction-detail";

async function DetailPage({ params }: { params: { id: string } }) {
    return (
        <TransactionHistoryDetail id={params.id}/>
    );
}

export default DetailPage;
