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

function CarouselV2({ data }: { data: IBanner[] }) {
  return (
    <div>
      <div className="bg-background flex justify-center items-center md:py-4">
        <Carousel
          className="h-auto w-full max-w-6xl shadow rounded-lg"
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
            style={{ aspectRatio: 27 / 9 }}
            className="rounded-lg"
          >
            {data.map((item, index) => (
              <CarouselItem
                key={index.toString()}
                className="flex justify-center rounded-lg"
              >
                <img
                  key={index}
                  src={item.image_url}
                  alt={item.name}
                  sizes="100%"
                  style={{ aspectRatio: 27 / 9 }}
                  className={`object-cover md:rounded-lg h-full w-auto duration-500 bg-slate-200`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16 bg-background border-theme-primary-500 text-theme-primary-500 hover:text-theme-primary-600" />
          <CarouselNext className="mr-16 bg-background border-theme-primary-500 text-theme-primary-500 hover:text-theme-primary-600" />
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselV2;
