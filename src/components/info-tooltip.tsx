import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface props {
  children: React.ReactNode;
  className?: ClassNameValue;
}

const InfoTooltip = ({ children, className }: props) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild className="hidden md:block">
          <InfoCircledIcon className={cn(className)} />
        </HoverCardTrigger>
        <HoverCardContent className="w-fit rounded-lg px-3 py-2 max-w-80">
          {children}
        </HoverCardContent>
      </HoverCard>
      <Popover>
        <PopoverTrigger asChild className="md:hidden">
          <InfoCircledIcon className={cn(className)} />
        </PopoverTrigger>
        <PopoverContent className="w-fit rounded-lg px-3 py-2 max-w-80">
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default InfoTooltip;
