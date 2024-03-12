"use client";

import { IBanner } from "@/Type";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

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

    return (
        <div className="relative">
            <div
                {...swipeHandlers}
                className="overflow-hidden relative w-full rounded-lg"
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
                        className={`absolute object-cover w-full transition-opacity duration-500 ease-in-out ${
                            index === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
            {data.length > 1 && (
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
            )}
        </div>
    );
};

export default Carousel;
