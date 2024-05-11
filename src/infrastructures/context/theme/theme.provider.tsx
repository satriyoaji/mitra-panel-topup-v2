"use client";

import React, { useState } from "react";
import ThemeContext, { ThemeDispatch } from "./theme.context";
import { useSession } from "next-auth/react";
import { ITheme } from "@/Type";
import { roboto } from "./fonts";

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [theme, setTheme] = useState<ITheme>({
        primary: {
            title: "red",
            pallete: "theme-primary-red",
        },
        secondary: {
            title: "teal",
            pallete: "theme-secondary-teal",
        },
        font: {
            title: "Roboto",
            class: roboto,
        },
    });

    const dispatch = (data: ThemeDispatch) => {
        switch (data.action) {
            case "SET_FONT":
                setTheme((prev) => ({ ...prev, font: data.payload }));
                return;
            case "SET_PRIMARY_COLOR":
                setTheme((prev) => ({ ...prev, primary: data.payload }));
                return;
            case "SET_SECONDARY_COLOR":
                setTheme((prev) => ({ ...prev, secondary: data.payload }));
                return;
            default:
                return;
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                data: theme,
                dispatch,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
