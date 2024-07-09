"use client";

import CardProduct from "../flash-sale/flash-sale-card";
import { Button } from "@/components/ui/button";
import { IFlashSaleInfo } from "@/types/flash-sale";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CountdownCard from "./countdown-card";
import { parseISO } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
      <div
        className="mt-6 relative rounded-xl bg-cover"
        style={{ backgroundImage: 'url("/assets/thunder.svg")' }}
      >
        <div className="w-full rounded-xl bg-gradient-to-r from-theme-primary-900/95 to-theme-primary-200/70 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-white/80 backdrop-blur-sm py-1 pr-1 rounded-tl-lg rounded-br-lg">
              <p className="px-2 text-sm font-semibold">🔥{data.name}</p>
              <CountdownCard
                date={parseISO(data.expired_at)}
                onExpired={() => {}}
              />
            </div>
            {data.products.length > 8 && (
              <Link href="/flash-sale">
                <Button size="sm" variant="link">
                  See More
                </Button>
              </Link>
            )}
          </div>
          <div className="">
            <div className="bg-cover rounded-xl">
              {/* <div className="py-1 flex rounded-xl bg-gradient-to-r from-theme-primary-900/95 to-theme-primary-200/70">
              <div className="gap-3 p-3 flex overflow-x-auto no-scrollbar">
                {data?.products?.map((item, idx) => (
                  <div
                    className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]"
                    key={`${idx}`}
                    >
                    <CardProduct data={item} />
                  </div>
                  ))}
                  </div>
                  </div> */}
              <Carousel className="py-3 flex rounded-xl ">
                <CarouselContent className="mx-1.5">
                  {data?.products?.slice(0, 8).map((item, idx) => (
                    <CarouselItem
                      className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]"
                      key={`${idx}`}
                    >
                      <CardProduct data={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FlashSale;
