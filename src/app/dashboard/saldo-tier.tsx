"use client";
import React from "react";
import Tier, { TierType } from "../../components/tier";
import { useSession } from "next-auth/react";
import { Separator } from "../../components/ui/separator";

function SaldoTier() {
    const { data: session } = useSession();

    if (session)
        return (
            <>
                <div className="flex space-x-4 mx-2 justify-between items-center">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">
                            Saldo Point
                        </p>
                        <p className="font-extrabold">20.000 Point</p>
                    </div>
                    {/* <Separator orientation="vertical" className="mx-3 h-10" /> */}
                    <Tier
                        type={(session?.tier?.name as TierType) ?? "Public"}
                    />
                </div>
                <Separator className="mb-3 mt-2" />
            </>
        );
}

export default SaldoTier;
