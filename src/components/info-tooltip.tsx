import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface props {
  children: React.ReactNode;
  className?: ClassNameValue;
}

const InfoTooltip = ({ children, className }: props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <InfoCircledIcon className={cn(className)} />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit rounded-lg px-3 py-2 max-w-80">
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};

export default InfoTooltip;
