"use client";

import { debounce } from "@/Helpers";
import { IProductCategory } from "@/Type";
import { Combobox, TValue } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { ChangeEvent, useEffect, useState } from "react";

function Filter({ onChange }: { onChange: (val: TValue | undefined) => void }) {
  const [data, setData] = useState<TValue[]>([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState<TValue | undefined>();

  const getList = async () => {
    let searchParams = new URLSearchParams({
      page: `1`,
      limit: "10",
      key: search,
    });

    var res = await fetch(`/api/products/categories?` + searchParams);

    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        var resData: TValue[] = dataJson.data.map((i: IProductCategory) => {
          return {
            value: i.key,
            label: i.name,
          };
        });
        setData(resData);
        if (resData.length > 0) {
          setValue(resData[0]);
          onChange(resData[0]);
        }
        return;
      }
      setData([]);
    }
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500);

  return (
    <div className="md:flex md:space-x-1 space-y-1 md:space-y-0 w-full">
      <div className="w-full">
        <Combobox
          onChange={(val) => {
            setValue(val);
            onChange(val);
          }}
          data={data}
          placeholder="Pilih Kategori"
          defaultValue={value}
        />
      </div>
      <div className="w-full">
        <Input
          id="invoice"
          placeholder="Search..."
          className="bg-white w-full"
          onChange={doSearch}
        />
      </div>
    </div>
  );
}

export default Filter;
