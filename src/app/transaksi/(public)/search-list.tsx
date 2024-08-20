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
    params.set("page", `${page}`);
    router.push(`${pathname}?${params.toString()}`);
    get();
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      <div className="flex items-center w-full mt-2 gap-2 sticky top-12 px-2 bg-background py-4 z-10">
        <Input
          className="w-full bg-background"
          placeholder="Masukkan nomor handphone atau invoice"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={getData}>Cari</Button>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {!loading ? (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {list.map((val, idx) => (
                <ItemsCard key={`${idx}`} data={val} />
              ))}
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
