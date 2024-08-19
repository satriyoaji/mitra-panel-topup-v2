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

function Page() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center w-full px-2">
      <div className="md:container w-full my-4 flex flex-col justify-center items-center">
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
            <h3 className="font-semibold primary">Saldoku</h3>
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
