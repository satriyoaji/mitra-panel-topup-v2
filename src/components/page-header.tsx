"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
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

export type path = {
    name: string;
    path: string;
};

const paths: path[] = [
    {
        name: "Kategori",
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

    return (
        <header className="w-full grid grid-cols-3 z-50 bg-theme-primary rounded-b-2xl border-b-8 border-theme-secondary items-center top-0 sticky">
            <div className="block md:hidden"></div>
            <Link
                href="/"
                className="justify-self-center md:justify-self-start md:mx-4"
            >
                <div className="font-extrabold text-xl m-0 p-0">⚡🎮⚡</div>
            </Link>
            <div className="hidden md:flex justify-center items-center gap-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        {paths.map((i) => (
                            <NavigationMenuItem className="bg-transparent">
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
            </div>
            <div className="justify-self-end">
                {session && !path.includes("/profile") ? (
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
                    <div className="m-2">
                        <Button size="sm">Login</Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
