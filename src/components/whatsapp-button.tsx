"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon, ChatBubbleIcon } from "@radix-ui/react-icons";

function WhatsappButton() {
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
        <div className="fixed bottom-0 h-0 z-10 w-full border-t-2 shadow-md bg-background/0 backdrop-blur supports-[backdrop-filter]:bg-background/0">
            <Button
                variant="destructive"
                className={`gap-2 md:bottom-8 opacity-100 flex justify-center items-center fixed z-90 bottom-16 right-16 bg-theme-secondary-500 rounded-full drop-shadow-lg text-theme-primary-foreground transition-all hover:bg-theme-primary-700 hover:drop-shadow-2xl hover:animate-bounce duration-300`}
                // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <ChatBubbleIcon />
                <p>Bantuan</p>
            </Button>
        </div>
    );
}

export default WhatsappButton;
