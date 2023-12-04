import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import React from "react";

function DetailProfile() {
    const { data: session } = useSession();

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <Avatar className="my-3 h-16 w-16">
                    <AvatarImage
                        src={session?.user?.image as string}
                        alt={session?.user?.name as string}
                    />
                    <AvatarFallback>{session?.user?.name}</AvatarFallback>
                </Avatar>
                <h5 className="font-bold text-xl">{session?.user?.name}</h5>
                <h6 className="text-xs">{session?.user?.email}</h6>
                <div className="w-full my-3 px-12">
                    <Label htmlFor="invoice">No. Whatsapp</Label>
                    <Input id="invoice" placeholder="Masukan No. Whatsapp" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Simpan</Button>
            </DialogFooter>
        </>
    );
}

export default DetailProfile;
