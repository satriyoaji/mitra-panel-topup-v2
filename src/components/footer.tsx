"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";
import { nFormatter } from "@/Helpers";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";

function Footer() {
  const path = usePathname();
  const [data, setData] = useState<ISosmed[]>([]);
  const { data: theme } = useContext(ThemeContext) as IThemeContext;

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
    <div
      style={{ backgroundImage: 'url("/assets/illustration/v1/footer.svg")' }}
      className="bg-no-repeat bg-right"
    >
      <div
        className={`bg-theme-primary-400/90 pt-4 px-4 pb-12 flex flex-col items-center ${
          theme.version == "v1"
            ? "rounded-t-2xl border-t-4 border-theme-secondary"
            : ""
        }`}
      >
        {theme.version !== "1" && (
          <div className="md:flex gap-8 pb-4 px-8 items-center my-6">
            <div className="md:mb-4 w-full">
              <p className="text-white text-sm font-semibold mt-4">
                Dipercaya oleh gamers Indonesia
              </p>
              <p className="text-white text-2xl mt-2 font-bold w-fit">
                Termurah dan Terpercaya
              </p>
              <p className="text-slate-100 text-xs mt-1">
                Menyediakan layanan Top up berbagai puluhan game dengan ribuan
                produk dan Pulsa termurah dan terpercaya di Indonesia.
              </p>
            </div>
            <div className="w-full h-full">
              <div className="flex h-full items-center justify-between mt-8 px-6 mb-4 rounded-xl">
                {/* <div className="flex flex-col items-center"> */}
                <div>
                  <p className="font-semibold md:text-3xl text-2xl text-white">
                    {nFormatter(1000)}
                  </p>
                  <p className="font-semibold md:text-base text-xs text-slate-100">
                    Pengguna
                  </p>
                </div>
                {/* <div className="flex flex-col items-center"> */}
                <div>
                  <p className="font-semibold md:text-3xl text-2xl text-white">
                    {nFormatter(9230)}
                  </p>
                  <p className="font-semibold md:text-base text-xs text-slate-100">
                    Produk
                  </p>
                </div>
                {/* <div className="flex flex-col items-center"> */}
                <div>
                  <p className="font-semibold md:text-3xl text-2xl text-white">
                    {nFormatter(238000)}
                  </p>
                  <p className="font-semibold md:text-base text-xs text-slate-100">
                    Transaksi
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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
    </div>
  );
}

export default Footer;
