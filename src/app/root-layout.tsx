"use client";

import "./globals.css";
import ThemeProvider from "@/infrastructures/context/theme/theme.provider";
import { SessionProvider } from "next-auth/react";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";

export default function RootTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
