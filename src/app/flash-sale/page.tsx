"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import FlashSaleCard from "./flash-sale-card";
import { IFlashSaleProduct } from "@/Type";
import { debounce } from "@/Helpers";
import Image from "next/image";
import Loading from "../loading";

function Page() {
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState<IFlashSaleProduct[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPage = useMemo(() => Math.ceil(total / 12), [total]);

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
        setTotal(dataJson.pagination.total_data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setData([]);
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
      <div className="flex px-2 sticky top-12 py-4 bg-white flex-col space-y-1.5 mb-3 z-10">
        <p className="font-semibold text-lg">Flash Sale⚡</p>
        <div className="flex space-x-1">
          <Input
            id="invoice"
            placeholder="Search..."
            className="bg-white"
            onChange={doSearch}
          />
        </div>
      </div>
      <div className="min-h-[68vh]">
        {loading ? (
          <Loading />
        ) : (
          <>
            {data.length > 0 ? (
              <div className="grid sm:grid-cols-4 xl:grid-cols-6 grid-cols-2 gap-2 mx-2">
                {data.map((item, idx) => (
                  <div className="w-full h-full" key={`${idx}`}>
                    <FlashSaleCard data={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <Image
                  src={
                    "/illustration/DrawKit Larry Character Illustration (10).svg"
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
      <div className="flex items-center justify-between space-x-2 py-4 mt-2">
        <p className="text-xs text-muted-foreground mx-2">Total {total} data</p>
        <div className="flex items-center justify-end space-x-2">
          <p className="font-semibold text-xs mr-2">
            Page {pageIndex} of {totalPage}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => prev - 1)}
            disabled={pageIndex == 1}
            className="flex items-center justify-center"
          >
            <span>Prev</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={pageIndex >= totalPage}
            className="flex justify-center items-center"
          >
            <span>Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
