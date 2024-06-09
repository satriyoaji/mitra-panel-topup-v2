import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function HelpButton() {
  return (
    <div className="fixed bottom-0 h-0 z-10 w-full border-t-2 shadow-md bg-background/0 backdrop-blur supports-[backdrop-filter]:bg-background/0">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="destructive"
            className={`gap-2 md:bottom-8 opacity-100 flex justify-center items-center fixed z-90 bottom-16 right-4 bg-theme-secondary-500 rounded-full drop-shadow-lg text-theme-primary-foreground transition-all hover:bg-theme-primary-700 hover:drop-shadow-2xl duration-300`}
          >
            <ChatBubbleIcon />
            <p>Bantuan</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium text-xs leading-none">Bantuan</h4>
            <p className="text-xs text-muted-foreground">
              Anda bisa meminta bantuan melalui link dibawah.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default HelpButton;
