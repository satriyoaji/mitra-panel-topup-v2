"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ItemsCard from "./items-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import FilterTransaksi, { TFilter } from "./filter-transaksi";
import { ITransactionHistoryList } from "@/Type";
import { debounce } from "@/Helpers";
import Loading from "../../loading";
import Pagination from "@/components/pagination";
import { TPaginationMeta } from "@/types/utils";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function List() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filterOpen, setfilterOpen] = useState<boolean>(false);
  const [lists, setLists] = useState<ITransactionHistoryList[]>([]);
  const [filter, setFilter] = useState<TFilter>({
    search: undefined,
    status: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<TPaginationMeta | undefined>();
  const [page, setPage] = useState(searchParams.get("page") ?? 1);

  const getData = async () => {
    let searchParams = new URLSearchParams({
      page: `${page}`,
    });
    if (filter.search) searchParams.append("search", filter.search);
    if (filter.status) searchParams.append("status", `${filter.status}`);

    setLoading(true);
    var res = await fetch(`/api/transaction?` + searchParams);

    if (res.ok) {
      const resData = await res.json();
      setMeta(resData.manifest);
      if (resData) {
        setLists(resData.data);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", filter.search ?? "");
    params.set("page", `${page}`);
    router.push(`${pathname}?${params.toString()}`);
    getData();
  }, [filter, page]);

  const { data: session } = useSession();

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  }, 1500);

  return (
    <div className="md:mx-2">
      <div className="flex -mx-2 px-4 sticky top-12 py-4 bg-background rounded-xl h-full flex-col z-20">
        <h3 className="font-semibold text-primary p-0 mt-2">
          Riwayat Pesananku
        </h3>
        <div className="flex space-x-1 mt-3">
          <Input
            id="invoice"
            placeholder="Cari Transaksi #TMXXXX atau No. Handphone"
            className="bg-background"
            onChange={doSearch}
          />
          {session ? (
            <Popover open={filterOpen} onOpenChange={setfilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={`${
                    (filter.search || filter.status) && `text-primary`
                  }`}
                  size="sm"
                >
                  <MixerHorizontalIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[25rem]">
                <p className="font-semibold">Filter Status Transaksi</p>
                <FilterTransaksi
                  state={filter}
                  onChange={(filter) => {
                    setFilter((prev) => ({
                      ...prev,
                      status: filter.status,
                    }));
                    setfilterOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {!loading ? (
          lists.length > 0 ? (
            lists.map((val, idx) => <ItemsCard key={`${idx}`} data={val} />)
          ) : (
            <div className="w-full flex flex-col items-center justify-center col-span-full">
              <ShoppingCartIcon className="h-[30vh] text-black/10" />
              <h3 className="font-bold text-black/10 p-0">Belum Ada Data</h3>
            </div>
          )
        ) : (
          <div className="col-span-full">
            <Loading />
          </div>
        )}
      </div>
      {meta && lists.length > 0 ? (
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
    </div>
  );
}

export default List;
