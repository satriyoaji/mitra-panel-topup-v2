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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TransactionHistoryDetail from "./transaction-detail";

function SearchList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [list, setList] = useState<ITransactionHistoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [meta, setMeta] = useState<TPaginationMeta | undefined>();
  const [transction, setTransaction] = useState<
    ITransactionHistoryList | undefined
  >();
  const [open, setOpen] = useState(false);

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
    router.replace(`${pathname}?${params.toString()}`);
    get();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex items-center w-full mt-2 gap-2 sticky top-12 -mx-2 px-2 bg-background py-4">
        <Input
          className="w-full bg-white"
          placeholder="Masukkan nomor handphone atau invoice"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={getData}>Cari</Button>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        {!loading ? (
          <>
            {list.map((val, idx) => (
              <ItemsCard
                key={`${idx}`}
                data={val}
                // onEditClick={() => {
                //   setTransaction(val);
                //   setOpen(true);
                // }}
              />
            ))}
            {meta && meta.total > 0 ? (
              <Pagination
                meta={meta}
                onChange={(val) => {
                  setPage(val);
                  getData();
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
      {transction && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{transction?.transaction_code}</DialogTitle>
              <DialogDescription>Detail transaksi</DialogDescription>
            </DialogHeader>
            <TransactionHistoryDetail id={transction?.transaction_code} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default SearchList;
