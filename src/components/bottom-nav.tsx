import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";
import { HomeIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons";

function BottomNav() {
    return (
        <div className="fixed bottom-0 h-12 z-50 w-full max-w-xl border-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="flex justify-between items-center h-full">
                <div className="flex flex-col h-fit items-center w-full hover:text-red-500 cursor-pointer">
                    <HomeIcon className="w-4 h-4" />
                    <p className="text-xs h">Home</p>
                </div>
                <div className="flex flex-col h-fit items-center w-full hover:text-red-500 cursor-pointer">
                    <ReaderIcon className="w-4 h-4" />
                    <p className="text-xs">Transaksi</p>
                </div>
                <div className="flex flex-col h-fit items-center w-full hover:text-red-500 cursor-pointer">
                    <PersonIcon className="w-4 h-4" />
                    <p className="text-xs">Profile</p>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;
