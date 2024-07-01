"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import FlashSaleCard from "./flash-sale-card";
import { debounce } from "@/Helpers";
import Image from "next/image";
import Loading from "../../loading";
import Pagination from "@/components/pagination";
import { IFlashSaleInfo } from "@/types/flash-sale";

function Page() {
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState<IFlashSaleInfo | undefined>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getFlashSale = async () => {
    let searchParams = new URLSearchParams({
      page_num: "1",
      page_size: "12",
      product_search: search,
    });

    setLoading(true);
    var res = await fetch(`/api/flash-sales?` + searchParams);
    setLoading(false);
    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        setData(dataJson.data);
        // setTotal(dataJson.pagination.total_data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setData(undefined);
      setTotal(0);
    }
  };

  useEffect(() => {
    (async () => {
      await getFlashSale();
    })();
  }, [search, pageIndex]);

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500);

  return (
    <div className="md:mx-2">
      <div className="flex px-2 sticky top-12 py-4 bg-background flex-col space-y-1.5 mb-3 z-10">
        <p className="font-semibold text-lg">Flash Sale⚡</p>
        <div className="flex space-x-1">
          <Input
            id="invoice"
            placeholder="Search..."
            className="bg-background"
            onChange={doSearch}
          />
        </div>
      </div>
      <div className="min-h-[68vh]">
        {loading ? (
          <Loading />
        ) : (
          <>
            {data && data.products?.length > 0 ? (
              <div className="grid sm:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-2 mx-2">
                {data.products.map((item, idx) => (
                  <div className="w-full h-full" key={`${idx}`}>
                    <FlashSaleCard data={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <Image
                  src={
                    "/assets/illustration/DrawKit Larry Character Illustration (10).svg"
                  }
                  className="opacity-50"
                  alt="dw"
                  height={400}
                  width={400}
                />
                <h5 className="text-xl font-bold">Tidak ada Flash Sale</h5>
              </div>
            )}
          </>
        )}
      </div>
      {/* <Pagination
        onChange={setPageIndex}
        meta={{
          limit: 12,
          page: pageIndex,
          total,
        }}
      /> */}
    </div>
  );
}

export default Page;
