import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import StatusSelect from "./status-select";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

export type TFilter = {
    date: DateRange | undefined;
    filter: string | undefined;
};

type Prop = {
    onChange: (date: DateRange | undefined, filter: string | undefined) => void;
    state: TFilter;
};

function FilterTransaksi(prop: Prop) {
    const [filter, setFilter] = useState<TFilter>(prop.state);

    const onApply = () => {
        prop.onChange(filter.date, filter.filter);
    };

    const onClear = () => {
        setFilter({
            date: undefined,
            filter: "*",
        });
        prop.onChange(undefined, "*");
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Filter Transaksi</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col p-2">
                <div className="space-y-2">
                    <StatusSelect
                        value={filter.filter}
                        onChange={(e) =>
                            setFilter((prev) => ({
                                ...prev,
                                filter: e,
                            }))
                        }
                    />
                    <DatePickerWithRange
                        date={filter.date}
                        onChange={(e) =>
                            setFilter((prev) => ({
                                ...prev,
                                date: e,
                            }))
                        }
                    />
                </div>
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="mt-3 w-full"
                        onClick={onClear}
                    >
                        Clear
                    </Button>
                    <Button size="sm" className="mt-3 w-full" onClick={onApply}>
                        Apply
                    </Button>
                </div>
            </div>
        </>
    );
}

export default FilterTransaksi;
