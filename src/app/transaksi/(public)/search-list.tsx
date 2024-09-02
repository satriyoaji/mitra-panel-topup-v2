"use client";

import { ITransactionHistoryList } from "@/Type";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import ItemsCard from "../(authenticated)/items-card";
import Pagination from "@/components/pagination";
import { TPaginationMeta } from "@/types/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function SearchList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [list, setList] = useState<ITransactionHistoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [meta, setMeta] = useState<TPaginationMeta | undefined>();

  const get = async () => {
    if (!search) setList([]);
    let sendSearchParams = new URLSearchParams({
      page: `${page}`,
    });
    sendSearchParams.append("public_search", search);
    sendSearchParams.append("isAdvance", "1");

    setLoading(true);
    var res = await fetch(`/api/transaction?` + sendSearchParams);
    setLoading(false);

    if (res.ok) {
      const resData = await res.json();
      setMeta(resData.manifest);
      if (resData) {
        setList(resData.data);
        return;
      }
    }
  };

  const getData = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();

    get();
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      <div className="flex items-center w-full mt-2 gap-2 sticky top-11 p-4 rounded-3xl bg-background z-10">
        <Input
          className="w-full bg-background"
          placeholder="Masukkan nomor handphone atau invoice"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={getData} className="space-x-1">
          <MagnifyingGlassIcon />
          <p className="hidden md:block">Cari</p>
        </Button>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {!loading ? (
          <>
            <div className="grid md:grid-cols-2 gap-4 px-2 md:px-0">
              {list.length > 0 ? (
                list.map((val, idx) => <ItemsCard key={`${idx}`} data={val} />)
              ) : (
                <div className="w-full flex flex-col items-center justify-center col-span-full">
                  <ShoppingCartIcon className="h-[30vh] text-black/10" />
                  <h3 className="font-bold text-black/10 p-0">
                    Belum Ada Data
                  </h3>
                </div>
              )}
            </div>
            {meta && meta.total > 0 ? (
              <Pagination
                meta={meta}
                onChange={(val) => {
                  setPage(val);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default SearchList;
