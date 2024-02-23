import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/custom-input";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function DetailProfile({ onSuccess }: { onSuccess: () => void }) {
    const { data: session, update } = useSession();
    const [phone, setPhone] = useState<string>();
    const { toast } = useToast();

    useEffect(() => {
        setPhone(session?.phone);
    }, []);

    const handleSubmit = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/web/update-phone`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({
                    phone,
                }),
            }
        );

        if (!response.ok) {
            const res = await response.json();
            return toast({
                title: "Failed",
                description: res.remark,
                variant: "destructive",
            });
        }

        onSuccess();
        await update();
        return toast({
            title: "Success",
            description: "Update phone number success",
            variant: "success",
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <Avatar className="my-3 h-16 w-16">
                    <AvatarImage
                        src={session?.user?.image as string}
                        alt={session?.user?.name as string}
                    />
                    <AvatarFallback>
                        {session?.user?.name?.at(0) ?? ""}
                    </AvatarFallback>
                </Avatar>
                <h5 className="font-bold text-xl">{session?.user?.name}</h5>
                <h6 className="text-xs">{session?.user?.email}</h6>
                <div className="w-full my-3 px-12">
                    <Label htmlFor="invoice">No. Whatsapp</Label>
                    <PhoneInput
                        onValueChange={(e) => {
                            setPhone(`${e}`);
                        }}
                        value={phone}
                        placeholder="Masukan No. Whatsapp"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit}>Simpan</Button>
            </DialogFooter>
        </>
    );
}

export default DetailProfile;
