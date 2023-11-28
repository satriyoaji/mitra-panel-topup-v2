"use client";
const items: string[] = [
    "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt674314efe488e9a4/64b13f0acc7487ee6e3bea1c/fc24.jpg?auto=webp&format=pjpg&width=3840&quality=60",
    "https://theme.zdassets.com/theme_assets/70804/2146dfcbe15775950aa0e924aaed80ef8300a1f5.jpg",
];

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const Carousel = () => {
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
        setActiveIndex((activeIndex + items.length - 1) % items.length);
    };

    const next = () => {
        setActiveIndex((activeIndex + 1) % items.length);
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
                style={{ aspectRatio: 21 / 9 }}
            >
                {items.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={item}
                        style={{ aspectRatio: 21 / 9 }}
                        className={`absolute object-cover w-full transition-opacity duration-500 ease-in-out ${
                            index === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>
            <div className="flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-md mt-[-1.5rem] ml-1 absolute cursor-pointer">
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
    );
};

export default Carousel;
