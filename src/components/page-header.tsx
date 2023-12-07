"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";

function Header() {
    const { data: session } = useSession();
    const path = usePathname();
    const router = useRouter();

    return (
        <header className="w-full grid grid-cols-3 z-50 max-w-xl sticky top-0 bg-red-500 rounded-b-2xl">
            <div></div>
            <Link href="/" className="justify-self-center">
                <div className="font-extrabold text-xl p-2">Topmur.com</div>
            </Link>
            <div className="justify-self-end">
                {session && !path.includes("/profile") && (
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
                )}
            </div>
        </header>
    );
}

export default Header;
