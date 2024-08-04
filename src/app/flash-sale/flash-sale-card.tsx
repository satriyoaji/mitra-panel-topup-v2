import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import Link from "next/link";
import { LightningBoltIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import { priceMask } from "@/Helpers";
import { IFlashSaleInProduct } from "@/types/flash-sale";
import Image from "next/image";

function FlashSaleCard({
  data,
  selected,
}: {
  data: IFlashSaleInProduct;
  selected?: boolean;
}) {
  const disc = Math.ceil(
    ((data.price - data.discounted_price) / data.price) * 100
  );
  return (
    <Link
      href={`/games/${data.category_key}?item=${data.key}`}
      className="w-full h-full"
    >
      <div
        className={`min-h-[6rem] h-full bg-white hover:bg-slate-50 rounded-xl border-t-0 border-r-0 ${
          selected ? "border-4 border-theme-secondary" : "border"
        }`}
      >
        <div className="p-0 flex flex-col m-0 h-full">
          {/* <div className="flex flex-row-reverse">
                        <div>
                            <div
                                style={{ fontSize: "65%" }}
                                className="text-xs bg-red-500 w-fit flex text-white font-semibold space-x-1 px-2 py-0.5 rounded-bl-lg rounded-tr"
                            >
                                <p>Hemat {priceMask(data?.discount_price)}</p>
                                <LightningBoltIcon />
                            </div>
                        </div>
                    </div> */}
          <div className="pt-3 flex flex-col justify-between h-full items-start">
            <div className="flex space-x-0.5 px-3 ">
              {/* <div className="overflow-clip rounded w-fit min-w-[2rem]">
                {data.image_url ? (
                  <Image
                    width={30}
                    height={30}
                    alt={data.name}
                    className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                    src={data.image_url}
                  />
                ) : (
                  <div className="p-1 aspect-square hover:scale-125 transition duration-300 hover:rotate-12 flex justify-center items-center">
                    <SketchLogoIcon className="m-auto w-5 h-5" />
                  </div>
                )}
              </div> */}
              <p className="text-xs font-semibold">{data.name}</p>
            </div>
            <div className="w-full px-3 ">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="px-1 pt-1 pb-0.5 font-semibold text-xs my-0.5 rounded-md bg-amber-300">
                      {disc}%
                    </p>
                    <p
                      className="line-through text-xs mt-0.5"
                      style={{ fontSize: "70%" }}
                    >
                      {priceMask(data.price)}
                    </p>
                  </div>
                  <p
                    className="text-red-500 text-xs font-medium"
                    style={{ fontSize: "80%" }}
                  >
                    {priceMask(data.discounted_price)}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-full w-full flex items-end rounded-b-lg mt-2.5">
              <div className="bg-theme-primary-50 text-theme-primary-300 w-full rounded-b-lg">
                <p className="text-xs text-center p-1">{data.category_key}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FlashSaleCard;
