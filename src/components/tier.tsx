import React from "react";
import { Badge } from "./ui/badge";

export type TierType = "Gold" | "Silver" | "Public";
interface ITier extends React.HTMLAttributes<HTMLDivElement> {
    type?: TierType;
}

function Tier(prop: ITier) {
    if (prop.type == "Gold")
        return (
            <Badge
                className={`bg-yellow-400 hover:bg-yellow-200 text-black ${prop.className}`}
            >
                Gold
            </Badge>
        );
    else if (prop.type == "Silver")
        return (
            <Badge className={prop.className} variant="secondary">
                Silver
            </Badge>
        );
    else
        return (
            <Badge className={prop.className} variant="outline">
                Public
            </Badge>
        );
}

export default Tier;
