import BottomNav from "@/components/bottom-nav";
import Header from "@/components/page-header";
import React, { ReactNode } from "react";

function LayoutWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="md:container md:max-w-7xl">
            {children}
            <BottomNav />
        </div>
    );
}

export default LayoutWrapper;
