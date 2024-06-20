"use client";

import { ITransactionHistoryList } from "@/Type";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import ItemsCard from "../(authenticated)/items-card";

function SearchList() {
  const [list, setList] = useState<ITransactionHistoryList[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getData = async () => {
    if (!search) setList([]);
    let searchParams = new URLSearchParams({
      page: `${1}`,
    });
    searchParams.append("search", search);

    setLoading(true);
    var res = await fetch(`/api/transaction?` + searchParams);
    setLoading(false);

    if (res.ok) {
      const resData = await res.json();
      if (resData) {
        setList(resData.data);
        return;
      }
    }
  };

  return (
    <>
      <div className="flex items-center w-full mt-8 gap-2">
        <Input
          className="w-full bg-white"
          placeholder="Masukkan nomor handphone atau invoice"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={getData}>Cari</Button>
      </div>
      <div className="flex flex-col space-y-4">
        {!loading ? (
          list.map((val, idx) => (
            <ItemsCard key={`${idx}`} data={val} onEditClick={() => {}} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default SearchList;
