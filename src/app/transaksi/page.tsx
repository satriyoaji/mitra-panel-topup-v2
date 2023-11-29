"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ItemsCard from "./items-card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Page() {
    const [open, setopen] = useState<boolean>(false);

    return (
        <div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="invoice">Invoice</Label>
                <Input id="invoice" placeholder="Masukan No. Invoice" />
            </div>
            <div className="mb-1 mt-6 flex space-x-2">
                <Select>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status Transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status Transaksi</SelectLabel>
                            <SelectItem value="apple">All</SelectItem>
                            <SelectItem value="banana">Success</SelectItem>
                            <SelectItem value="blueberry">
                                On Progress
                            </SelectItem>
                            <SelectItem value="grapes">Failed</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-3 mt-3 h-[72vh] no-scrollbar overflow-y-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                    <ItemsCard onEditClick={() => setopen(true)} />
                ))}
            </div>
            <Dialog open={open} onOpenChange={setopen}>
                <DialogContent className="sm:max-w-[25rem]">
                    <DialogHeader>
                        <DialogTitle>Invoice</DialogTitle>
                        <DialogDescription>
                            10:32:23, 23 October 2023
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-2 flex gap-4">
                        <div className="flex flex-col justify-center">
                            <img
                                alt="Remy Sharp"
                                className="rounded  border bg-card text-card-foreground shadow w-24"
                                src="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-xs text-muted-foreground">
                                BDEU89EW
                            </p>
                            <p className="text-xl mt-2">FIFA 23</p>
                            <p className="font-bold">20.000 Diamonds</p>
                            <p className="text-sm mt-3">
                                Rp 10.000 + 10.000 Points
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-3 pt-2 pb-4">
                        <div className="grid grid-cols-4 items-center gap-2">
                            <p className="text-xs">Pembayaran</p>
                            <div className="col-span-3">
                                <Badge variant="success">Success</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <p className="text-xs">Transaksi</p>
                            <div className="col-span-3">
                                <Badge variant="destructive">Failed</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <p className="text-xs">Claim</p>
                            <div className="col-span-3">
                                <Badge variant="warning">On Progress</Badge>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button>Claim Refund</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Page;
