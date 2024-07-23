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

  if (days > 0)
    return (
      <div className="flex rounded-xl pt-1 pb-0.5 px-2 space-x-1 text-center text-xs items-center justify-center bg-red-500 backdrop-blur text-white font-medium">
        <p className="p-0">
          {days > 0
            ? `${days} hari lagi`
            : `${hours}h : ${minutes}m : ${seconds}s`}
        </p>
      </div>
    );

  return (
    <div className="flex rounded-xl pt-1 pb-0.5 px-2 space-x-1 text-center text-xs items-center justify-center backdrop-blur text-white font-medium">
      <p className="p-1 pb-0.5 bg-red-500 rounded">{hours}</p>
      <p>:</p>
      <p className="p-1 pb-0.5 bg-red-500 rounded">{minutes}</p>
      <p>:</p>
      <p className="p-1 pb-0.5 bg-red-500 rounded">{seconds}</p>
    </div>
  );
}

export default CountdownCard;
