"use client";
import Tier, { TierType } from "@/components/tier";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ExitIcon, Pencil1Icon, ReaderIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import DetailProfile from "./detail-profile";

function page() {
    const { data: session } = useSession();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    return (
        <>
            <div className="xs:m-4 sm:m-6">
                <div className="flex justify-between items-start">
                    <div className="flex flex-row space-x-4">
                        <Avatar className="my-1">
                            <AvatarImage
                                src={session?.user?.image as string}
                                alt={session?.user?.name as string}
                            />
                            <AvatarFallback>
                                {session?.user?.name?.at(0) ?? ""}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h5 className="font-bold text-xl">
                                {session?.user?.name}
                            </h5>
                            <h6 className="text-xs">{session?.user?.email}</h6>
                        </div>
                    </div>
                    <Pencil1Icon
                        onClick={() => setProfileOpen(true)}
                        className="cursor-pointer"
                    />
                </div>
                <Card className="my-4">
                    <div className="p-2 flex items-center justify-between">
                        <div className=" w-full p-2">
                            <p className="font-bold text-muted-foreground text-xs">
                                Saldo Points
                            </p>
                            <p className="font-bold">20.000 Points</p>
                        </div>
                        <Tier
                            className="place-self-center m-3"
                            type={(session?.tier?.name as TierType) ?? "Public"}
                        />
                    </div>
                </Card>
                <Separator className="mb-6" />
                <div className="space-y-3 px-3">
                    <Link
                        href="/transaksi"
                        className="flex space-x-3 items-center text-sm hover:text-theme-primary-500"
                    >
                        <ReaderIcon className="mr-3" /> Daftar Transaksi
                    </Link>
                    <p
                        onClick={() => signOut()}
                        className="flex space-x-3 items-center text-sm cursor-pointer hover:text-theme-primary-500"
                    >
                        <ExitIcon className="mr-3" /> Logout
                    </p>
                </div>
            </div>
            <Dialog onOpenChange={setProfileOpen} open={profileOpen}>
                <DialogContent className="sm:max-w-md">
                    <DetailProfile onSuccess={() => setProfileOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default page;
