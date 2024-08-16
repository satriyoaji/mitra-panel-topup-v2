import { Badge } from "@/components/ui/badge";
import { ETransactionStatus } from "@/types/enums";
import React from "react";

function BadgeTransaksi({ status }: { status: number }) {
  return (
    <>
      {status === ETransactionStatus.Pending ? (
        <Badge variant="warning">Pending</Badge>
      ) : status === ETransactionStatus.Paid ? (
        <Badge variant="success">Paid</Badge>
      ) : status === ETransactionStatus["On Process"] ? (
        <Badge variant="warning">On Process</Badge>
      ) : status === ETransactionStatus.Delivered ? (
        <Badge variant="success">Delivered</Badge>
      ) : status === ETransactionStatus.Failed ? (
        <Badge variant="destructive">Failed</Badge>
      ) : status === ETransactionStatus.Refunded ? (
        <Badge variant="black">Refunded</Badge>
      ) : status === ETransactionStatus.Aborted ? (
        <Badge variant="destructive">Aborted</Badge>
      ) : (
        <></>
      )}
    </>
  );
}

export default BadgeTransaksi;
