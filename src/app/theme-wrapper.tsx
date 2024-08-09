import React, { useContext } from "react";
import { Poppins as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "500",
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <body className="min-h-screen bg-repeat antialiased">
      <div className="bg-zinc-50">{children}</div>
    </body>
  );
}

export default ThemeWrapper;
