"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Searchbar from "@/app/dashboard/searchbar";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";

export type path = {
    name: string;
    path: string;
};

const paths: path[] = [
    {
        name: "Produk",
        path: "/games",
    },
    {
        name: "Flash Sale",
        path: "/flash-sale",
    },
    {
        name: "Transaksi",
        path: "/transaksi",
    },
];

function Header() {
    const { data: session } = useSession();
    const path = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full flex justify-between z-50 bg-theme-primary rounded-b-2xl border-b-8 border-theme-secondary items-center top-0 sticky">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="m-2">
                            <TextAlignJustifyIcon className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="mt-8 gap-2 flex flex-col">
                            {paths.map((i) => (
                                <SheetClose key={i.path}>
                                    <Button
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() => {
                                            router.push(i.path);
                                        }}
                                    >
                                        {i.name}
                                    </Button>
                                </SheetClose>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <Link
                href="/"
                className="justify-self-center md:justify-self-start md:mx-4"
            >
                <div className="font-extrabold text-xl m-0 p-0">⚡🎮⚡</div>
            </Link>
            <div className="hidden md:flex justify-between items-center md:container md:px-32">
                <NavigationMenu>
                    <NavigationMenuList>
                        {paths.map((i) => (
                            <NavigationMenuItem
                                className="bg-transparent"
                                key={i.path}
                            >
                                <Link href={i.path} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()}`}
                                    >
                                        {i.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <Searchbar />
            </div>
            <div className="flex justify-self-end items-center gap-2">
                {session ? (
                    <Avatar
                        className="my-1 mx-5 cursor-pointer"
                        onClick={() => router.push("/profile")}
                    >
                        <AvatarImage
                            src={session?.user?.image as string}
                            alt={session?.user?.name as string}
                        />
                        <AvatarFallback>
                            {session?.user?.name?.at(0) ?? ""}
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <Link href="/auth/login" className="m-2">
                        <Button size="sm">Login</Button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
