"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";

function HelpButton() {
  const [data, setData] = useState<ISosmed[]>([]);

  useEffect(() => {
    (async () => {
      var res = await fetch("/api/social-media");
      if (res.ok) {
        var data = await res.json();
        setData(data.data);
        return;
      }

      setData([]);
    })();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <ChatBubbleIcon className="w-3 h-3" />
          <p className="text-xs ml-1">Bantuan</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-xs leading-none">Bantuan</h4>
          <p className="text-xs text-muted-foreground">
            Anda bisa meminta bantuan melalui link dibawah.
          </p>
          {data.map((item) => (
            <div
              className={`flex hover:bg-zinc-50 gap-4 px-2 py-1 cursor-pointer items-center`}
              key={item.key}
            >
              <div
                className={`w-7 bg-primary p-0.5 rounded-full flex items-center justify-center`}
              >
                <Socmed type={item.key} />
              </div>
              <p className={`text-xs text-primary`}>{item.name}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default HelpButton;
