"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import Link from "next/link";
import { IProductCategory, TProductGroup } from "@/Type";
import { CubeIcon } from "@radix-ui/react-icons";
import { debounce, uniqeCategory } from "@/Helpers";
import Loading from "../loading";
// import Image from "next/image";

export default function ListGame() {
  const [group, setGroup] = useState<TProductGroup>({
    id: "",
    name: "All",
  });
  const [data, setData] = useState<Array<IProductCategory>>([]);
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<TProductGroup[]>([]);

  const totalPage = useMemo(() => Math.ceil(total / 8), [total]);

  const getData = async (more: boolean) => {
    setLoading(true);
    var res = await fetch(
      `/api/products/categories/?` +
        new URLSearchParams({
          page: `${pageIndex}`,
          limit: "10",
          key: search,
          group_id: `${group?.id ?? ""}`,
        })
    );

    setLoading(false);
    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        setData(result.data);
        // if (more)
        //     setData((prev) => uniqeCategory(prev.concat(result.data)));
        // else setData(uniqeCategory(result.data));
      } else {
        if (!more) setData([]);
      }

      setTotal(result.manifest.total);
    }
  };

  const getGroup = async () => {
    var res = await fetch(`/api/products/groups/?`);

    if (res.ok) {
      let data: TProductGroup[] = [
        {
          id: "",
          name: "All",
        },
      ];
      var result = await res.json();
      data = data.concat(result.data);
      setGroups(data);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    setPageIndex(1);
    getData(false);
  }, [search, group]);

  useEffect(() => {
    getData(true);
  }, [pageIndex]);

  const showMore = () => {
    setPageIndex((last) => last + 1);
  };

  const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500);

  return (
    <React.Fragment>
      <div className="md:flex md:items-end md:justify-between sticky z-10 top-6 py-2 bg-white">
        <div className="flex md:block items-end justify-between mt-8">
          <h5 className="mr-8 font-semibold px-2 mb-2">Kategori</h5>
          <div
            className="no-scrollbar z-10 mb-2 md:mb-0"
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {groups.map((val, idx) => (
              <Badge
                className={`mx-1 cursor-pointer inline-block whitespace-nowrap`}
                variant={val.id == group.id ? "default" : "outline"}
                key={`${idx}`}
                onClick={() => {
                  setData([]);
                  setGroup(val);
                }}
              >
                {val.name}
              </Badge>
            ))}
          </div>
        </div>
        <Input
          onChange={doSearch}
          placeholder="Search..."
          className="bg-white md:max-w-xs"
        />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4 gap-2 mt-4 place-items-center justify-center px-2">
        {data.map((val: IProductCategory, idx) => (
          <Link href={`/games/${val.key}`} key={idx} className="w-full h-full">
            <Card className="w-full h-full min-w-fit rounded-xl hover:bg-slate-50">
              <CardContent className="p-1 md:p-2 flex flex-col items-center">
                <div className="overflow-clip rounded-xl w-full bg-slate-200">
                  {val.image_url !== "" ? (
                    <img
                      alt={val.name}
                      className="rounded-xl aspect-square hover:scale-125 transition duration-300 hover:rotate-12"
                      src={val.image_url}
                    />
                  ) : (
                    <div className="w-full aspect-square hover:scale-125 flex justify-center items-center transition z-0 duration-300 hover:rotate-12">
                      <CubeIcon className="text-white m-auto h-20 w-20" />
                    </div>
                  )}
                </div>
                <p className="md:text-xs text-[70%] text-center my-2">
                  {val.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {loading && <Loading />}
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
