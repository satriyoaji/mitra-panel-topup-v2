import { IProductCategory } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { CubeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import Description from "./collapsible-description";

function Header({ category }: { category: IProductCategory }) {
  return (
    <Card className="w-full mt-2 h-full min-w-fit">
      <CardContent className="p-0 pb-4">
        {/* {category.banner_url && ( */}
        <div
          className="w-full rounded-lg p-4 max-h-24"
          style={{ aspectRatio: 27 / 9 }}
        >
          <img
            alt={category.name}
            src={category?.image_url ?? "/assets/hero-games.svg"}
            style={{ aspectRatio: 27 / 9 }}
            className={`object-cover w-full rounded-xl`}
          />
          {/* <Image
            fill
            alt={category.name}
            src={"/assets/hero-games.svg"}
            style={{ aspectRatio: 64 / 9 }}
            className={`relative object-cover w-full rounded-t-xl`}
            /> */}
        </div>
        {/* )} */}
        <div className="px-6">
          <div className="flex ml-4 z-10 gap-4 items-start">
            {category?.image_url ? (
              <div className="rounded flex items-center justify-center w-16 h-16 bg-white">
                <img
                  alt={category.name}
                  className="h-auto w-14 rounded"
                  src={category?.image_url}
                />
              </div>
            ) : (
              <div className="border rounded flex items-center justify-center w-16 h-16 bg-slate-200">
                <CubeIcon className="w-10 h-10 text-white" />
              </div>
            )}
            <Description description={category?.description} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
