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
        <div className="fixed max-w-xl px-8 w-full z-50 flex justify-end bottom-16">
            <Button
                variant="destructive"
                className={`${
                    scrolling ? "opacity-100" : "opacity-0"
                } transition-all duration-500 ease-in-out`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <ArrowUpIcon />
            </Button>
        </div>
    );
}

export default ToTopButton;
