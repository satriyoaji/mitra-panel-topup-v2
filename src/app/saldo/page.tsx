"use client";
import React from "react";
import SaldoPointHistory from "./saldopoint-history";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "next-auth/react";
import { priceMask } from "@/Helpers";
import InfoTooltip from "@/components/info-tooltip";

function Page() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center w-full px-2">
      <div className="max-w-7xl w-full my-4 flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Riwayat Saldo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-4xl w-full space-y-4">
          <div className="bg-background rounded-lg p-4 w-full sticky top-12">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold primary">Saldo Point</h3>
              <InfoTooltip>
                <p className="text-xs">Ini Merupakan Saldo Refund</p>
              </InfoTooltip>
            </div>
            <h6 className="text-primary font-medium">
              {priceMask(session?.profile.saldo ?? 0)}
            </h6>
          </div>
          <SaldoPointHistory />
        </div>
      </div>
    </div>
  );
}

export default Page;
