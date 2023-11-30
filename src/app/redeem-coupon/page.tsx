"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

function Page() {
    const { toast } = useToast();

    return (
        <div className="mx-6 mt-4">
            <h4 className="text-2xl font-semibold">Claim Coupon</h4>
            <p className="text-muted-foreground text-sm mt-2">
                Kupon saldo point ini mempunyai tujuan untuk menggantikan nilai
                transaksi yang statusnya “gagal” namun pembayarannya "berhasil".
            </p>
            <Separator className="my-6" />
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="id">No. Invoice</Label>
                    <Input id="id" placeholder="Masukan No. Invoice" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="file">Bukti Transaksi</Label>
                    <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        placeholder="Pilih bukti transaksi"
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Masukan Email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="whatsapp">No. Whatsapp</Label>
                    <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="Masukan No. Whatsapp"
                    />
                </div>
                <Button
                    className="mt-4"
                    onClick={() => {
                        toast({
                            title: "Transaction Success",
                            description: "Friday, February 10, 2023 at 5:57 PM",
                            variant: "success",
                        });
                    }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default Page;
