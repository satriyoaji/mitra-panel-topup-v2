"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

function StatusSelect({ onChange }: { onChange: (val: string) => void }) {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-40">
                <SelectValue placeholder="Status Transaksi" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status Transaksi</SelectLabel>
                    <SelectItem value="*">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="on progress">On Progress</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default StatusSelect;
