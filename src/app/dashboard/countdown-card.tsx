"use client";
import { useCountdown } from "@/Hooks";
import { ClockIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

function CountdownCard({
  date,
  onExpired,
}: {
  date: Date;
  onExpired?: () => void;
}) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(date);

  useEffect(() => {
    if (isExpired && onExpired) onExpired();
  }, [seconds]);

  return (
    <div className="flex rounded-xl py-1 pl-1.5 pr-2 space-x-1 text-center text-xs items-center justify-center bg-red-500 backdrop-blur text-white font-medium">
      <ClockIcon />
      <p className="p-0">
        {days > 0
          ? `${days} hari lagi`
          : `${hours}h : ${minutes}m : ${seconds}s`}
      </p>
    </div>
  );
}

export default CountdownCard;
