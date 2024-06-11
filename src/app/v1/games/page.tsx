"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { IFlashSaleProduct, TProduct, TProductItem } from "@/Type";
import { debounce, nFormatter, priceMask } from "@/Helpers";
import ProductCard from "./[slug]/(product)/product-card";
import Image from "next/image";
import Loading from "../../loading";
import { useRouter } from "next/navigation";
import Filter from "./filter";
import Pagination from "@/components/pagination";
import { TValue } from "@/components/ui/combobox";

function Page() {
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState<TProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TValue | undefined>();
  const route = useRouter();

  const getList = async () => {
    let searchParams = new URLSearchParams({
      page_num: `${pageIndex}`,
      page_size: "30",
      search,
    });

    setLoading(true);
    if (category) {
      var res = await fetch(
        `/api/products/items/${category.value}?` + searchParams
      );

      if (res.ok) {
        const dataJson = await res.json();
        console.log(dataJson);
        if (dataJson.data) {
          setData(dataJson.data);
          setTotal(dataJson.data.length);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          return;
        }
        setData([]);
        setTotal(0);
      }
    }
    setLoading(false);
  };
  console.log(category);

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [search, pageIndex, category]);

  return (
    <div className="md:mx-2">
      <div className="flex px-2 sticky top-12 py-4 bg-white flex-col space-y-1.5 mb-3">
        <p className="font-semibold text-lg">Produk</p>
        <Filter onChange={setCategory} />
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
                    <ProductCard
                      // category={item.category_alias}
                      discountedPrice={item.discounted_price}
                      name={item.name}
                      imageURL={item.image_url}
                      price={`${priceMask(item.price)}`}
                      onClick={() =>
                        route.push(`/games/${category?.value}?item=${item.key}`)
                      }
                    />
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
                  width={500}
                  height={500}
                />
                <h5 className="text-xl font-bold -mt-10">Item Kosong</h5>
              </div>
            )}
          </>
        )}
      </div>
      <Pagination
        onChange={setPageIndex}
        meta={{
          limit: 12,
          page: pageIndex,
          total,
        }}
      />
    </div>
  );
}

export default Page;
