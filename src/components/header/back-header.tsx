"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

function BackHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="w-full flex md:hidden justify-center z-20 bg-white items-center top-0 sticky p-1 border-b h-[50px]">
      <div className="w-full flex max-w-7xl items-center justify-between">
        <div className="flex md:w-fit w-full justify-start items-center space-x-1 px-2">
          <ArrowLeftIcon
            className="text-primary cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="text-primary font-medium text-lg">{title}</p>
        </div>
      </div>
    </header>
  );
}

export default BackHeader;
