"use client";
import { useSession } from "next-auth/react";
import React from "react";

function SaldoCard() {
    const { data: session } = useSession();
    return (
        <div className="flex px-4 py-3 w-full rounded-xl justify-between gap-4 items-center bg-theme-secondary-50 border border-theme-secondary-100">
            <p className="text-sm text-theme-secondary-700">Saldo Points</p>
            <p className="font-medium text-theme-secondary-800">
                {session?.profile.saldo} Points
            </p>
        </div>
    );
}

export default SaldoCard;
