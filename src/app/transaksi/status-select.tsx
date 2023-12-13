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
import React, { useCallback, useState } from "react";

function StatusSelect({
    onChange,
    value,
}: {
    onChange: (val: string | undefined) => void;
    value?: string;
}) {
    const [val, setVal] = useState<string | undefined>(value ?? "*");

    const onSelect = useCallback((v: string | undefined) => {
        setVal(v);
        onChange(v);
    }, []);

    return (
        <Select onValueChange={onSelect} defaultValue={val}>
            <SelectTrigger className="w-full">
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
