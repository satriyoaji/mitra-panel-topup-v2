"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { IProductCategory } from "@/Type";
import { CubeIcon } from "@radix-ui/react-icons";
import { debounce, uniqeCategory } from "@/Helpers";

const chips: string[] = ["All", "VCG", "Games", "Voucher", "Pulsa", "PLN"];
type productType = "VCG" | "Games" | "Voucher" | "Pulsa" | "PLN";

export default function ListGame() {
    const [filter, setfilter] = useState<null | string>(null);
    const [data, setData] = useState<Array<IProductCategory>>([]);
    const [search, setSearch] = useState<string>("");
    const [pageIndex, setPageIndex] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const totalPage = useMemo(() => Math.ceil(total / 8), [total]);

    const getData = async (more: boolean) => {
        setLoading(true);
        var res = await fetch(
            `/api/products/categories/?` +
                new URLSearchParams({
                    page_num: `${pageIndex}`,
                    page_size: "8",
                    code: search,
                })
        );

        setLoading(false);
        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (more)
                    setData((prev) => uniqeCategory(prev.concat(result.data)));
                else setData(uniqeCategory(result.data));
            } else {
                if (!more) setData([]);
            }

            setTotal(result.pagination.total_data);
        }
    };

    const getGroup = async () => {};

    useEffect(() => {
        setPageIndex(1);
        getData(false);
    }, [search]);

    useEffect(() => {
        getData(true);
    }, [pageIndex]);

    const showMore = () => {
        setPageIndex((last) => last + 1);
    };

    const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 500);

    const filterList = (val: string) => {
        setfilter(val == "All" ? null : val);
    };

    return (
        <React.Fragment>
            <div className="flex items-end justify-between mt-4">
                <h5 className="mr-8 text-xl">Games</h5>
                <div
                    className="no-scrollbar z-10"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                    }}
                >
                    {chips.map((val, idx) => (
                        <Badge
                            className="mx-1 cursor-pointer"
                            key={idx.toString()}
                            color="primary"
                            variant={
                                filter === null && val === "All"
                                    ? "destructive"
                                    : val == filter
                                    ? "destructive"
                                    : "outline"
                            }
                            onClick={() => filterList(val)}
                        >
                            {val}
                        </Badge>
                    ))}
                </div>
            </div>
            <Input
                onChange={doSearch}
                placeholder="Search..."
                className="my-3 bg-white"
            />
            <div className="grid xs:grid-cols-3 grid-cols-4 gap-3 mt-4 place-items-center justify-center">
                {data.map(
                    (val: IProductCategory, idx) =>
                        (filter == null ||
                            (filter != null && filter == val.alias)) && (
                            <Link
                                href={`/games/${val.uuid}`}
                                key={val.uuid}
                                className="w-full h-full"
                            >
                                <Card className="w-full h-full min-w-fit rounded-sm hover:bg-slate-50">
                                    <CardContent className="p-1 flex flex-col items-center">
                                        <div className="overflow-clip rounded w-full bg-slate-200">
                                            {val.logo_image !== "" ? (
                                                <img
                                                    alt="Remy Sharp"
                                                    className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                                    src={val.logo_image}
                                                />
                                            ) : (
                                                <div className="w-full h-full hover:scale-125 transition duration-300 hover:rotate-12">
                                                    <CubeIcon className="text-white w-20 m-auto h-28" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-center my-2">
                                            {val.alias}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                )}
            </div>
            {loading && (
                <div className="flex w-full justify-center items-center py-16">
                    <CubeIcon className="animate-spin w-10 h-10" />
                </div>
            )}
            {pageIndex < totalPage && (
                <div className="flex items-center justify-center my-2 mt-6">
                    <Button size="sm" onClick={showMore}>
                        Show More
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}
