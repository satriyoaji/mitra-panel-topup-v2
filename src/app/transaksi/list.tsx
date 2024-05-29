"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import ItemsCard from "./items-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import FilterTransaksi, { TFilter } from "./filter-transaksi";
import { ITransactionHistoryList } from "@/Type";
import { debounce } from "@/Helpers";

interface IProps {
  onClick: (val: ITransactionHistoryList | undefined) => void;
}

function List(props: IProps) {
  const [filterOpen, setfilterOpen] = useState<boolean>(false);
  const [lists, setLists] = useState<ITransactionHistoryList[]>([]);
  const [filter, setFilter] = useState<TFilter>({
    page: 1,
    search: undefined,
    status: undefined,
  });

  const getData = async () => {
    let searchParams = new URLSearchParams({
      page: `${filter.page}`,
    });
    if (filter.search) searchParams.append("search", filter.search);
    if (filter.status) searchParams.append("search", `${filter.status}`);

    var res = await fetch(`/api/transaction?` + searchParams);

    if (res.ok) {
      const resData = await res.json();
      if (resData) {
        setLists(resData.data);
        return;
      }
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

  const { data: session } = useSession();

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  }, 500);

  return (
    <div className="md:mx-2">
      <div className="flex -mx-2 px-2 sticky py-4 bg-white flex-col space-y-1.5 mb-3">
        <p className="font-semibold text-lg">Invoice🧾</p>
        <div className="flex space-x-1">
          <Input
            id="invoice"
            placeholder="Masukan No. Invoice"
            className="bg-white"
            onChange={doSearch}
          />
          {session && (
            <Dialog open={filterOpen} onOpenChange={setfilterOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={`${
                    (filter.search || filter.status) && "text-theme-primary-400"
                  }`}
                  size="sm"
                >
                  <MixerHorizontalIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[25rem]">
                <FilterTransaksi
                  state={filter}
                  onChange={(filter) => {
                    setFilter((prev) => ({
                      ...prev,
                      filter,
                    }));
                    setfilterOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-3 md:max-h-[78vh] md:overflow-y-auto">
        {lists.map((val, idx) => (
          <ItemsCard
            key={`${idx}`}
            data={val}
            onEditClick={() => {
              props.onClick(val);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
