"use client";

import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
} from "@/components/ui/carousel";
import { IBanner } from "@/types/utils";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRouter } from "next/navigation";

function CarouselV2({ data }: { data: IBanner[] }) {
  const router = useRouter();
  return (
    <div>
      <div className="bg-background flex justify-center items-center md:py-4">
        <Carousel
          className="h-full w-full max-w-7xl shadow md:rounded-lg"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 7500,
            }),
          ]}
        >
          <CarouselContent
            style={{ aspectRatio: 3 / 1 }}
            className="md:rounded-lg"
          >
            {data.map((item, index) => (
              <CarouselItem
                key={index.toString()}
                onClick={() =>
                  item.is_clickable || item.is_hyperlink
                    ? router.push(item.hyperlink_url)
                    : null
                }
                className={`flex justify-center md:rounded-lg overflow-clip ${
                  item.is_clickable || item.is_hyperlink ? "cursor-pointer" : ""
                }`}
              >
                <Image
                  key={index}
                  src={item.image_url}
                  alt={item.name}
                  height={2000}
                  width={6000}
                  style={{ aspectRatio: 3 / 1 }}
                  className={`object-cover h-auto w-auto md:rounded-lg duration-500 bg-zinc-200`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16 bg-background border-primary text-primary " />
          <CarouselNext className="mr-16 bg-background border-primary text-primary " />
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselV2;
