import React from "react";
import TransactionHistoryDetail from "./transaction-detail";
import { GetCredHeader } from "@/app/api/api-utils";
import { ISiteProfile } from "@/types/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const getData = async () => {
  const credentialHeader = GetCredHeader();

  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
    next: {
      revalidate: 30,
    },
  });

  if (res.ok) {
    var data = await res.json();
    return data.data;
  }

  return undefined;
};

async function DetailPage({ params }: { params: { id: string } }) {
  var profile: ISiteProfile | undefined = await getData();
  return (
    <div className="pt-4 px-2 flex w-full justify-center">
      <div className="max-w-7xl w-full flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/transaksi">Transaksi</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-5xl w-full">
          <TransactionHistoryDetail id={params.id} profile={profile} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
