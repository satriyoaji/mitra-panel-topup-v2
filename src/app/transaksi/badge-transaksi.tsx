import { Badge } from "@/components/ui/badge";
import React from "react";

function BadgeTransaksi({ status }: { status: number }) {
  return (
    <>
      {status === 1 ? (
        <Badge variant="warning">Pending</Badge>
      ) : status === 2 ? (
        <Badge variant="success">Paid</Badge>
      ) : status === 3 ? (
        <Badge variant="warning">On Process</Badge>
      ) : status === 4 ? (
        <Badge variant="success">Delivered</Badge>
      ) : status === 5 ? (
        <Badge variant="destructive">Failed</Badge>
      ) : status === 6 ? (
        <Badge variant="black">Refunded</Badge>
      ) : status === 7 ? (
        <Badge variant="destructive">Aborted</Badge>
      ) : (
        <></>
      )}
    </>
  );
}

export default BadgeTransaksi;
