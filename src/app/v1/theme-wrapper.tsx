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
      style={{
        backgroundImage: "url('/assets/hero-games.svg')",
        backgroundSize: "30%",
      }}
      className={cn(
        "min-h-screen bg-repeat antialiased",
        data.primary.class,
        data.secondary.class,
        data.font.class.className
      )}
    >
      <div className="bg-gradient-to-b from-theme-primary-50/95 to-theme-primary-200/95">
        {children}
      </div>
    </body>
  );
}

export default ThemeWrapper;
