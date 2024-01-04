"use client";

import Carousel from "@/app/dashboard/carousel";
import FlashSale from "@/app/dashboard/flash-sale";
import ListGame from "@/app/dashboard/list-game";
import SaldoTier from "@/app/dashboard/saldo-tier";

export default async function Home() {
    return (
        <>
            <SaldoTier />
            <Carousel />
            <FlashSale />
            <ListGame />
        </>
    );
}
