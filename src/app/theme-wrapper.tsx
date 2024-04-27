import React from "react";
import { cn } from "@/lib/utils";
import { Poppins as FontSans } from "next/font/google";

export const fontSans = FontSans({
    subsets: ["latin"],
    weight: "500",
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <body
            className={cn(
                "min-h-screen bg-background antialiased bg-slate-200 md:bg-theme-primary-100 theme-primary-blue theme-secondary-stone"
            )}
        >
            {children}
        </body>
    );
}

export default ThemeWrapper;
