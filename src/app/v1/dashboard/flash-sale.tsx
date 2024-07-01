"use client";

import CardProduct from "../flash-sale/flash-sale-card";
import { Button } from "@/components/ui/button";
import { IFlashSaleInfo } from "@/types/flash-sale";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CountdownCard from "./countdown-card";
import { parseISO } from "date-fns";

function FlashSale() {
  const [data, setData] = useState<IFlashSaleInfo | undefined>();

  const getFlashSale = useCallback(async () => {
    var res = await fetch(`/api/flash-sales`);

    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        setData(dataJson.data);
        return;
      }
    }
    setData(undefined);
  }, []);

  useEffect(() => {
    getFlashSale();
  }, []);

  if (data)
    return (
      <div className="mt-6 rounded-t-lg">
        <div className="flex justify-between">
          <p className="px-2 font-semibold md:hidden">🔥{data.name}</p>
          <CountdownCard
            date={parseISO(data.expired_at)}
            onExpired={() => {}}
          />
          <Link href="/flash-sale">
            <Button size="sm" variant="link">
              See More
            </Button>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="md:flex flex-col items-center justify-center px-4 mx-4 hidden">
            <h4 className="text-xl">⚡</h4>
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold italic w-full bg-theme-secondary text-theme-secondary-foreground px-3 py-2 -skew-x-12 z-10 rounded-tl-lg">
                {data.name}
              </h3>
              <h3 className="text-lg ml-8 font-bold italic bg-red-500 z-10 text-theme-secondary-foreground pr-2 pl-1.5 shadow-sm -skew-x-12 -mt-2 w-fit">
                Sale
              </h3>
            </div>
          </div>
          <div
            style={{ backgroundImage: 'url("/assets/thunder.svg")' }}
            className="w-full bg-cover rounded-xl"
          >
            <div className="py-1 w-full flex rounded-xl bg-gradient-to-r from-theme-primary-900/95 to-theme-primary-200/70">
              <div
                className="gap-3 p-3"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {data?.products?.map((item, idx) => (
                  <div
                    className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]"
                    key={`${idx}`}
                  >
                    <CardProduct data={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FlashSale;
