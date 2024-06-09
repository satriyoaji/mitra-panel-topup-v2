"use client";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/custom-input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DetailProfile from "../detail-profile";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function Profile() {
    const { data: session } = useSession();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    return (
        <>
            <div className="w-full space-y-3 max-w-md">
                <div className="md:grid md:grid-cols-3 space-y-1 md:space-y-0 w-full items-center">
                    <Label className="text-sm text-muted-foreground">
                        Nama
                    </Label>
                    {/* <Input className="col-span-3" placeholder="Masukan Nama..." /> */}
                    <p className="text-sm">{session?.profile.name}</p>
                </div>
                <div className="md:grid md:grid-cols-3 space-y-1 md:space-y-0 w-full items-center">
                    <Label className="text-sm text-muted-foreground">
                        Email
                    </Label>
                    {/* <Input className="col-span-3" readOnly /> */}
                    <p className="text-sm">{session?.profile.email}</p>
                </div>
                <div className="md:grid md:grid-cols-3 space-y-1 md:space-y-0 w-full items-center">
                    <Label className="text-sm text-muted-foreground">
                        No. Whatsapp
                    </Label>
                    {/* <PhoneInput
            className="col-span-3"
            placeholder="Masukkan No Whatsapp..."
            /> */}
                    <div className="flex space-x-4">
                        <p className="text-sm">{session?.profile.phone}</p>
                        <Pencil1Icon
                            onClick={() => setProfileOpen(true)}
                            className="cursor-pointer"
                        />
                    </div>
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

export default Profile;
