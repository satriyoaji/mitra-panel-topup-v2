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
    <div className="w-[7.9rem] flex bg- z-50 rounded-xl space-x-1 text-center text-xs items-center justify-center bg-red-500 backdrop-blur text-white font-medium">
      <ClockIcon />
      <p className="p-0">{`${hours}h : ${minutes}m : ${seconds}s`}</p>
    </div>
  );
}

export default CountdownCard;
