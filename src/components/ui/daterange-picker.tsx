"use client";

import * as React from "react";
import { CalendarIcon, Cross1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type prop = {
    onChange: (date: DateRange | undefined) => void;
    date?: DateRange;
};

export function DatePickerWithRange(props: prop) {
    const [date, setDate] = React.useState<DateRange | undefined>(props.date);

    const onSelect = React.useCallback((val: DateRange | undefined) => {
        setDate(val);
        props.onChange(val);
    }, []);

    return (
        <div className={cn("grid gap-2")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start space-x-2 text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    <p>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </p>
                                    <Cross1Icon
                                        className="ml-2"
                                        onClick={() => onSelect(undefined)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{format(date.from, "LLL dd, y")}</p>
                                    <Cross1Icon
                                        className="ml-2"
                                        onClick={() => onSelect(undefined)}
                                    />
                                </>
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        selected={date}
                        onSelect={onSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
