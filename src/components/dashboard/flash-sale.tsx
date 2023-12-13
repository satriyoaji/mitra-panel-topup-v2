"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import CardProduct from "./card-product";
import { useCountdown } from "@/Helpers";

function FlashSale() {
    const [opacity, setopacity] = useState<number>(1);
    const [hours, minutes, seconds] = useCountdown(new Date("2023-12-16"));

    return (
        <Fragment>
            <div className="my-4">
                <div className="w-[7.9rem] pb-1 bg- z-50 rounded-t-xl  text-center text-xs flex items-center justify-center bg-red-500/95 backdrop-blur supports-[backdrop-filter]:bg-red-500/60 text-white pt-1 font-bold">
                    {`${hours}h : ${minutes}m : ${seconds}s`}
                </div>
                <div
                    style={{
                        padding: ".5rem 0",
                        display: "flex",
                        flexDirection: "row",
                        backgroundImage:
                            "linear-gradient(180deg, #f44336, #fff)",
                        borderRadius: 5,
                    }}
                    className="mt-[-.2rem]"
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#f44336",
                            borderRadius: 5,
                            opacity,
                        }}
                        className="w-[18rem] pb-4 pt-2 pl-4"
                    >
                        <Image
                            className="mt-2"
                            src="/flash-sale.png"
                            alt=""
                            width={100}
                            height={70}
                        />
                    </div>
                    <div
                        className="no-scrollbar z-10 mb-2"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "-7.9rem",
                            paddingLeft: "8rem",
                            overflowX: "auto",
                            scrollbarWidth: "none",
                        }}
                        onScroll={(e) =>
                            setopacity(
                                1 -
                                    (e.currentTarget.scrollLeft /
                                        (e.currentTarget.scrollWidth -
                                            e.currentTarget.clientWidth)) *
                                        3
                            )
                        }
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
                            <CardProduct
                                key={idx.toString()}
                                avatar="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
                                title="FIFA 23"
                                link="fea"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default FlashSale;
