"use client";

import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { Poppins as FontSans } from "next/font/google";
import ThemeContext, {
    IThemeContext,
} from "@/infrastructures/context/theme/theme.context";

export const fontSans = FontSans({
    subsets: ["latin"],
    weight: "500",
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { data } = useContext(ThemeContext) as IThemeContext;

    return (
        <body
            className={cn(
                "min-h-screen bg-background antialiased bg-slate-200 md:bg-theme-primary-50",
                data.primary.class,
                data.secondary.class,
                data.font.class
            )}
        >
            {children}
        </body>
    );
}

export default ThemeWrapper;
