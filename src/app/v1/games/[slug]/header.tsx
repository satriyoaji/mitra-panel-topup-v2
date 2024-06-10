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
        <div
          className="overflow-hidden relative w-full rounded-t-xl"
          style={{ aspectRatio: 64 / 9 }}
        >
          {/* <img
                        alt={category.name}
                        src={category?.banner_image ?? "/assets/hero-games.svg"}
                        style={{ aspectRatio: 64 / 9 }}
                        className={`relative object-cover w-full rounded-t-xl`}
                    /> */}
          <Image
            fill
            alt={category.name}
            src={"/assets/hero-games.svg"}
            style={{ aspectRatio: 64 / 9 }}
            className={`relative object-cover w-full rounded-t-xl`}
          />
        </div>
        <div className="px-6">
          <div className="flex -mt-4 ml-4 z-10 absolute items-end">
            {category?.image_url ? (
              <img
                alt={category.name}
                className="rounded  border bg-card text-card-foreground shadow w-16"
                src={category?.image_url}
              />
            ) : (
              <div className="border rounded flex items-center justify-center w-16 h-16 bg-slate-200">
                <CubeIcon className="w-10 h-10 text-white" />
              </div>
            )}
            <div className="flex flex-col mb-2 ml-3">
              <h5 className="font-bold">{category?.name}</h5>
            </div>
          </div>
          <Description />
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
