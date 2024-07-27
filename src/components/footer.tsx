"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";
import { nFormatter } from "@/Helpers";
import ThemeContext, {
    IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import {
    ArrowRightIcon,
    ChatBubbleIcon,
    EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

function Footer() {
    const path = usePathname();
    const [data, setData] = useState<ISosmed[]>([]);
    const { data: theme } = useContext(ThemeContext) as IThemeContext;

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
            className="bg-no-repeat bg-right bg-background pt-10"
        >
            <div className="w-full flex items-center flex-col mb-8">
                <div className="max-w-6xl px-6">
                    <p className="font-semibold text-sm">
                        Top Up Game Online dan Beli Voucher Game Online Terbaru
                        dan Murah di Topmur
                    </p>
                    <p className="text-muted-foreground text-xs mt-1.5 leading-5">
                        Top Up game & voucher Topmur.com. Metode pembayaran
                        lengkap, dijamin aman, garansi uang kembali 10x lipat,
                        instant proses, terpercaya dan legal 100%. Buat para
                        buyer, seller, dan sultan-sultan di luar sana pastikan
                        belanja dan jualan top up game dan voucher mu di
                        Topmur.com. Tersedia bermacam-macam jenis game populer
                        seperti Mobile Legends, PUBG Mob... Valorant, Free Fire,
                        Ragnarok, Dragon Raja, Light Of Thel, Steam Wallet dan
                        berbagai game lainnya yang tidak kalah seru untuk
                        dimainkan.
                    </p>
                    <div className="grid my-4 md:grid-cols-5 sm:grid-cols-2 grid-cols-1 sm:gap-8">
                        <div className="md:col-span-2 mt-8">
                            <p className="text-xl font-bold">VC Gamers</p>
                            <p className="text-muted-foreground text-xs mt-1.5 leading-5">
                                Topumur adalah menyediakan layanan Top up game
                                dan Reseller Voucher Game termurah dan
                                terpercaya di Indonesia. Topup lebih dari 100
                                game online terkemuka dunia di VocaGame mudah
                                aman tanpa registrasi, pembelian instan langsung
                                masuk dalam hitungan detik.
                            </p>
                        </div>
                        <div className={`bg-background flex flex-col mt-8`}>
                            <p className="font-bold text-foreground text-sm">
                                Menu Lainnya
                            </p>
                            <div className="space-y-1 mt-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <ArrowRightIcon /> <p>Member Area</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ArrowRightIcon /> <p>Kebijakan Privasi</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ArrowRightIcon /> <p>Syarat Ketentuan</p>
                                </div>
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
