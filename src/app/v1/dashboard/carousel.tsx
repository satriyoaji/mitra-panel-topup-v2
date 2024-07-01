"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./carousel.css";
import { Button } from "@/components/ui/button";
import { IBanner } from "@/types/utils";

const Carousel = ({ data }: { data: IBanner[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      next();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [activeIndex]);

  const prev = () => {
    if (data.length > 1)
      setActiveIndex((activeIndex + data.length - 1) % data.length);
  };

  const next = () => {
    if (data.length > 1) setActiveIndex((activeIndex + 1) % data.length);
  };

  const onSwipedLeft = () => next();
  const onSwipedRight = () => prev();

  const swipeHandlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  const getStyles = (index: number) => {
    if (activeIndex === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeIndex - 1 === index)
      return {
        opacity: 0.3,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeIndex + 1 === index)
      return {
        opacity: 0.3,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (activeIndex - 2 === index)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeIndex + 2 === index)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < activeIndex - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeIndex + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <div className="block bg-gradient-to-r from-theme-primary-50 via-theme-secondary-400 to-theme-primary-50 md:py-4 md:-mx-8 md:-mt-4">
      <div className="h-full flex w-full justify-center items-center">
        <div
          {...swipeHandlers}
          className="overflow-hidden relative w-auto max-w-5xl rounded-xl h-full"
          style={{ aspectRatio: 27 / 9 }}
        >
          {/* <Image
                            key={index}
                            src={item.image_url}
                            alt={item.name}
                            sizes="100%"
                            height={100}
                            width={100}
                            style={{ aspectRatio: 27 / 9 }}
                            className={`absolute object-cover w-auto transition-opacity duration-500 ease-in-out ${
                                index === activeIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        /> */}
          {data.map((item, index) => (
            <img
              key={index}
              src={item.image_url}
              alt={item.name}
              sizes="100%"
              style={{ aspectRatio: 27 / 9 }}
              className={`object-cover transition-opacity h-full w-full duration-500 bg-slate-200 ease-in-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      {data.length > 1 ? (
        <div className="flex justify-end mr-2 md:hidden">
          <div className="flex bg-background/95 ml-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-xl mt-[-1.5rem] absolute cursor-pointer">
            <ChevronLeftIcon
              width={12}
              height={12}
              className="mx-1 bg-wh"
              onClick={prev}
            />
            <ChevronRightIcon
              width={12}
              height={12}
              className="mx-1"
              onClick={next}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
