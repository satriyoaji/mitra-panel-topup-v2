"use client";

import { IBanner } from "@/Type";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./carousel.css";
import { Button } from "@/components/ui/button";

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
                transform:
                    "translateX(-240px) translateZ(-400px) rotateY(35deg)",
                zIndex: 9,
            };
        else if (activeIndex + 1 === index)
            return {
                opacity: 0.3,
                transform:
                    "translateX(240px) translateZ(-400px) rotateY(-35deg)",
                zIndex: 9,
            };
        else if (activeIndex - 2 === index)
            return {
                opacity: 0,
                transform:
                    "translateX(-480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 8,
            };
        else if (activeIndex + 2 === index)
            return {
                opacity: 0,
                transform:
                    "translateX(480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 8,
            };
        else if (index < activeIndex - 2)
            return {
                opacity: 0,
                transform:
                    "translateX(-480px) translateZ(-500px) rotateY(35deg)",
                zIndex: 7,
            };
        else if (index > activeIndex + 2)
            return {
                opacity: 0,
                transform:
                    "translateX(480px) translateZ(-500px) rotateY(-35deg)",
                zIndex: 7,
            };
    };

    return (
        <React.Fragment>
            <div className="hidden justify-center items-center md:flex gap-4">
                <Button className="rounded-full p-5 z-[20]" onClick={prev}>
                    <ChevronLeftIcon
                        width={18}
                        height={18}
                        className="mx-1 hover:cursor-pointer"
                    />
                </Button>
                <div className="slideC">
                    {data.map((item, i) => (
                        <React.Fragment key={item.id}>
                            <div
                                className="slide"
                                style={{
                                    ...getStyles(i),
                                }}
                            >
                                <Image
                                    src={item.path}
                                    alt={item.title}
                                    fill
                                    style={{ aspectRatio: 27 / 9 }}
                                    className={`absolute object-cover  transition-opacity rounded-md`}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <Button className="rounded-full p-5 z-[20]" onClick={next}>
                    <ChevronRightIcon
                        width={18}
                        height={18}
                        className="mx-1 hover:cursor-pointer"
                    />
                </Button>
            </div>
            <div className="md:hidden block">
                <div className="max-h-72">
                    <div
                        {...swipeHandlers}
                        className="overflow-hidden relative w-auto rounded-lg max-h-72"
                        style={{ aspectRatio: 27 / 9 }}
                    >
                        {data.map((item, index) => (
                            <Image
                                key={index}
                                src={item.path}
                                alt={item.title}
                                sizes="100%"
                                fill
                                style={{ aspectRatio: 27 / 9 }}
                                className={`absolute object-cover w-auto transition-opacity max-h-72 duration-500 ease-in-out ${
                                    index === activeIndex
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            />
                        ))}
                    </div>
                </div>
                {data.length > 1 && (
                    <div className="flex justify-end mr-2 md:hidden">
                        <div className="flex bg-background/95 ml-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-md mt-[-1.5rem] absolute cursor-pointer">
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
                )}
            </div>
        </React.Fragment>
    );
};

export default Carousel;
