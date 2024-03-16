"use client";
import { useCountdown } from "@/Hooks";
import { ClockIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

function CountdownCard({
    date,
    onExpired,
}: {
    date: Date;
    onExpired: () => void;
}) {
    const [hours, minutes, seconds, isExpired] = useCountdown(date);

    useEffect(() => {
        if (isExpired) onExpired();
    }, [seconds]);

    return (
        <div className="w-[7.9rem] flex pb-1 bg- z-50 rounded-t-xl space-x-1 text-center text-xs items-center justify-center bg-theme-primary-500/95 backdrop-blur supports-[backdrop-filter]:bg-theme-primary-500/60 text-white pt-1 font-bold">
            <ClockIcon />
            <p>{`${hours}h : ${minutes}m : ${seconds}s`}</p>
        </div>
    );
}

export default CountdownCard;
