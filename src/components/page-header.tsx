"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
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
import ThemeContext, {
    IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import Image from "next/image";

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
    const { dispatch, data } = useContext(ThemeContext) as IThemeContext;

    return (
        <header className="w-full z-20 shadow border-b-4 border-theme-secondary-500 bg-theme-primary-400 rounded-b-2xl items-center top-0 sticky">
            <div className="w-full flex sm:container items-center justify-between">
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="m-2">
                                <TextAlignJustifyIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="max-w-[15rem] border-r-8 border-theme-primary-400"
                        >
                            <div className="mt-8 gap-2 flex flex-col">
                                {paths.map((i) => (
                                    <SheetClose key={i.path}>
                                        <p
                                            className="w-full text-left p-1 px-2 rounded hover:bg-slate-200"
                                            onClick={() => {
                                                router.push(i.path);
                                            }}
                                        >
                                            {i.name}
                                        </p>
                                    </SheetClose>
                                ))}
                                <SheetClose>
                                    <p
                                        className="w-full text-left p-1 px-2 rounded hover:bg-slate-200"
                                        onClick={() => {
                                            dispatch({
                                                action: "RAND_THEME",
                                            });
                                        }}
                                    >
                                        Theme
                                    </p>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <Link
                    href="/"
                    className="justify-self-center md:justify-self-start mx-4"
                >
                    <Image src={data.logo} alt="dw" width={40} height={40} />
                </Link>
                <div className="hidden md:flex pl-8 text-theme-secondary-50 w-full">
                    <NavigationMenu>
                        <NavigationMenuList className="w-fit">
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
                            <NavigationMenuItem className="bg-transparent">
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} cursor-pointer`}
                                    onClick={() => {
                                        dispatch({
                                            action: "RAND_THEME",
                                        });
                                    }}
                                >
                                    Theme
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex justify-self-end items-center gap-2 rounded-br-2xl">
                    <Searchbar />
                    {session ? (
                        <div className="my-1 mx-3">
                            <Avatar
                                className="cursor-pointer"
                                onClick={() => router.push("/profile")}
                            >
                                <AvatarImage
                                    src={session?.profile?.name as string}
                                    alt={session?.profile?.name as string}
                                />
                                <AvatarFallback>
                                    {session?.profile?.name?.at(0) ?? ""}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    ) : (
                        <Link href="/auth/login" className="m-2">
                            <Button size="sm">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
