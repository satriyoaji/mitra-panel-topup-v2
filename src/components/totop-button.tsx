"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";

function ToTopButton() {
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const onScroll = (e: any) => {
            setScrollTop(e.target.documentElement.scrollTop);
            setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    return (
        <div className="fixed bottom-0 h-0 z-10 w-full max-w-xl border-t-2 shadow-md bg-background/0 backdrop-blur supports-[backdrop-filter]:bg-background/0">
            <Button
                variant="destructive"
                size="icon"
                className={`${
                    scrolling
                        ? "opacity-100 flex justify-center items-center"
                        : "opacity-0"
                } fixed z-90 bottom-16 right-4 bg-slate-800 rounded-full drop-shadow-lg text-white text-4xl transition-all hover:bg-slate-900 hover:drop-shadow-2xl hover:animate-bounce duration-300`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <ArrowUpIcon />
            </Button>
        </div>
    );
}

export default ToTopButton;
