import { CubeIcon } from "@radix-ui/react-icons";
import React from "react";

function Loading() {
    return (
        <div className="h-[88vh] flex items-center justify-center">
            <CubeIcon className="animate-spin w-10 h-10" />
        </div>
    );
}

export default Loading;
