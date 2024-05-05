"use client";

import { debounce } from "@/Helpers";
import { IProductCategory, TProduct } from "@/Type";
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function Searchbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<IProductCategory[]>([]);
    const [search, setSearch] = useState("");

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const getList = async () => {
        let searchParams = new URLSearchParams({
            page_num: `1`,
            page_size: "10",
            code: search,
        });

        var res = await fetch(`/api/products/categories?` + searchParams);

        if (res.ok) {
            const dataJson = await res.json();
            if (dataJson.data) {
                setData(dataJson.data);
                console.log(dataJson.data);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            console.log("dadawd", dataJson.data);
            setData([]);
        }
    };

    React.useEffect(() => {
        (async () => {
            await getList();
        })();
    }, [search]);

    const doSearch = debounce((e: string) => {
        setSearch(e);
    }, 500);

    React.useEffect(() => {
        setData([]);
    }, [isOpen]);

    return (
        <div className="hidden md:block">
            <div className="w-full flex-1 md:w-auto md:flex-none">
                <button
                    className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="hidden lg:inline-flex">
                        Cari Produk...
                    </span>
                    <span className="inline-flex lg:hidden">Search...</span>
                    <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </button>
            </div>
            <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
                <CommandInput
                    placeholder="Cari Produk..."
                    onValueChange={doSearch}
                />
                <CommandList className="min-h-[15rem]">
                    {data.length > 0 ? (
                        data.map((i) => (
                            <div
                                className="px-5 py-2 hover:bg-slate-50 cursor-pointer"
                                onClick={() => {
                                    router.push(`/games/${i.uuid}`);
                                    setIsOpen(false);
                                }}
                            >
                                <div className="text-sm">{i.alias}</div>
                            </div>
                        ))
                    ) : (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}
                </CommandList>
            </CommandDialog>
        </div>
    );
}

export default Searchbar;
