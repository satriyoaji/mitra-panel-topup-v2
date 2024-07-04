import React from "react";
import TransactionHistoryDetail from "./transaction-detail";

async function DetailPage({ params }: { params: { id: string } }) {
  return <TransactionHistoryDetail id={params.id} />;
}

export default DetailPage;
