"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import CardProduct from "./card-product";
import dynamic from "next/dynamic";

// const CountdownCard = dynamic(() => import("./countdown-card"), { ssr: false });

function FlashSale() {
    const [opacity, setopacity] = useState<number>(1);

    return (
        <Fragment>
            <div className="my-8">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundImage:
                            "linear-gradient(180deg, #f44336, #fff)",
                        borderRadius: 5,
                    }}
                    className="py-1"
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
                        className="no-scrollbar z-10 mb-2 pt-2"
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
