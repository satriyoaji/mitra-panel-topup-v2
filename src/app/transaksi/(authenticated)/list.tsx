"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
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

function List() {
    const [filterOpen, setfilterOpen] = useState<boolean>(false);
    const [lists, setLists] = useState<ITransactionHistoryList[]>([]);
    const [filter, setFilter] = useState<TFilter>({
        search: undefined,
        status: undefined,
    });
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<TPaginationMeta | undefined>();
    const [page, setPage] = useState(1);

    const getData = async () => {
        let searchParams = new URLSearchParams({
            page: `${page}`,
        });
        if (filter.search) searchParams.append("search", filter.search);
        if (filter.status) searchParams.append("status", `${filter.status}`);

        setLoading(true);
        var res = await fetch(`/api/transaction?` + searchParams);
        setLoading(false);

        if (res.ok) {
            const resData = await res.json();
            setMeta(resData.manifest);
            if (resData) {
                setLists(resData.data);
                return;
            }
        }
    };

    useEffect(() => {
        getData();
    }, [filter, page]);

    const { data: session } = useSession();

    const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({
            ...prev,
            search: e.target.value,
        }));
        setFilter((prev) => ({
            ...prev,
            search: e.target.value,
        }));
    }, 500);

    return (
        <div className="md:mx-2">
            <div className="flex -mx-2 px-2 sticky top-12 py-4 bg-background h-full flex-col space-y-1.5 mb-3">
                <p className="font-semibold text-lg">Riwayat Transaksi🧾</p>
                <div className="flex space-x-1">
                    <Input
                        id="invoice"
                        placeholder="Masukan No. Invoice"
                        className="bg-background"
                        onChange={doSearch}
                        value={filter.search}
                    />
                    {session ? (
                        <Popover open={filterOpen} onOpenChange={setfilterOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={`${
                                        (filter.search || filter.status) &&
                                        "text-theme-primary-400"
                                    }`}
                                    size="sm"
                                >
                                    <MixerHorizontalIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="max-w-[25rem]">
                                <p className="font-semibold">
                                    Filter Status Transaksi
                                </p>
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
            <div className="grid md:grid-cols-2 gap-4">
                {!loading ? (
                    lists.map((val, idx) => (
                        <ItemsCard key={`${idx}`} data={val} />
                    ))
                ) : (
                    <div className="col-span-full">
                        <Loading />
                    </div>
                )}
            </div>
            {meta ? (
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
