"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { ISiteProfile, ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";
import {
    ArrowRightIcon,
    ChatBubbleIcon,
    EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

function Footer({ profile }: { profile?: ISiteProfile }) {
    const path = usePathname();
    const [data, setData] = useState<ISosmed[]>([]);

    useEffect(() => {
        (async () => {
            var res = await fetch("/api/social-media");
            if (res.ok) {
                var data = await res.json();
                setData(data.data);
                return;
            }

            setData([]);
        })();
    }, []);

    if (path.includes("/games/")) return <></>;
    return (
        <div
            // style={{ backgroundImage: 'url("/assets/illustration/v1/footer.svg")' }}
            className="bg-no-repeat bg-right bg-background pt-2"
        >
            <div className="w-full flex items-center flex-col mb-8">
                <div className="max-w-6xl px-6">
                    <div className="grid my-4 md:grid-cols-5 sm:grid-cols-2 grid-cols-1 sm:gap-8">
                        <div className="md:col-span-2 mt-8">
                            {profile?.logo_url && (
                                <Image
                                    src={profile?.logo_url}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                />
                            )}
                            {profile ? (
                                <p
                                    className="text-muted-foreground text-xs mt-1.5 leading-5"
                                    dangerouslySetInnerHTML={{
                                        __html: profile?.description,
                                    }}
                                ></p>
                            ) : null}
                        </div>
                        <div className={`bg-background flex flex-col mt-8`}>
                            <p className="font-bold text-foreground text-sm">
                                Menu Lainnya
                            </p>
                            <div className="space-y-1 mt-2 text-sm">
                                <Link
                                    href="/kebijakan"
                                    className="flex items-center space-x-2"
                                >
                                    <ArrowRightIcon /> <p>Kebijakan Privasi</p>
                                </Link>
                                <Link
                                    href="/syarat-ketentuan"
                                    className="flex items-center space-x-2"
                                >
                                    <ArrowRightIcon /> <p>Syarat Ketentuan</p>
                                </Link>
                            </div>
                        </div>
                        <div className={`bg-background flex flex-col mt-8`}>
                            <p className="font-bold text-foreground text-sm">
                                Kontak
                            </p>
                            <div className="space-y-1 mt-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <EnvelopeClosedIcon /> <p>cs@topmur.com</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChatBubbleIcon /> <p>Hubungi CS</p>
                                </div>
                            </div>
                        </div>
                        <div className={`bg-background flex flex-col mt-8`}>
                            <p className="font-bold text-foreground text-sm">
                                Ikuti kami di
                            </p>
                            <div className="flex flex-wrap mt-2">
                                {data?.map((item, idx) => (
                                    <Link
                                        key={`${idx}`}
                                        className="bg-theme-primary-500 mr-2 mb-2 rounded-full text-theme-primary-500"
                                        href={item.value}
                                    >
                                        <div className="p-0.5">
                                            <div className="w-6 h-6">
                                                <Socmed type={item.key} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-theme-primary-500 w-full p-3">
                <p className="text-theme-primary-foreground text-xs px-2">
                    {`Copyright © ${new Date().getFullYear()}`}{" "}
                    <span className="font-semibold">Panel VC Gamers</span>
                    {` - All Right Reserved`}
                </p>
            </div>
        </div>
    );
}

export default Footer;
