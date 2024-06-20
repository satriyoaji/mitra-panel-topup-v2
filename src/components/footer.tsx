"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";

function Footer() {
  const path = usePathname();
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

  if (path.includes("/games/")) return <></>;
  return (
    <div className="bg-theme-primary-400 pt-4 px-4 pb-12 flex flex-col items-center rounded-t-2xl border-t-4 border-theme-secondary">
      <p className="font-bold text-theme-primary-foreground">Follow Us On</p>
      <div className="flex justify-center space-x-2 mt-2">
        {data?.map((item, idx) => (
          <Link
            key={`${idx}`}
            className="w-6 h-6 text-theme-primary-foreground"
            href={item.value}
          >
            <Socmed type={item.key} />
          </Link>
        ))}
      </div>
      <Separator className="mb-3 mt-6" />
      <p className="text-theme-primary-foreground text-xs">
        {`Copyright © ${new Date().getFullYear()}`}{" "}
        <span className="font-semibold">Panel VC Gamers</span>
        {` - All Right Reserved`}
      </p>
    </div>
  );
}

export default Footer;
