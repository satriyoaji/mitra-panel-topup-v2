import { IProductCategory } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { CubeIcon } from "@radix-ui/react-icons";
import React from "react";
import Description from "./collapsible-description";

function Header({ category }: { category: IProductCategory }) {
  return (
    <Card className="w-full mt-2 h-full min-w-fit">
      <CardContent className="p-4">
        {category.banner_url && (
          <div
            className="w-fit rounded-lg h-auto overflow-clip border pb-4"
            style={{ aspectRatio: 27 / 9 }}
          >
            <img
              alt={category.name}
              src={category?.banner_url ?? "/assets/hero-games.svg"}
              style={{ aspectRatio: 27 / 9 }}
              className={`object-cover w-full h-auto rounded-xl`}
            />
            {/* <Image
            fill
            alt={category.name}
            src={"/assets/hero-games.svg"}
            style={{ aspectRatio: 64 / 9 }}
            className={`relative object-cover w-full rounded-t-xl`}
            /> */}
          </div>
        )}
        <div>
          <div className="flex z-10 gap-4">
            {category?.image_url ? (
              <div className="rounded-lg border flex items-center justify-center overflow-clip w-16 h-16 bg-white">
                <img
                  alt={category.name}
                  className="h-auto w-14 rounded"
                  src={category?.image_url}
                />
              </div>
            ) : (
              <div className="border rounded flex items-center justify-center w-16 h-16 bg-zinc-200">
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
