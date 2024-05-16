"use client";
import ThemeProvider from "@/infrastructures/context/theme/theme.provider";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";
import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            <TransactionProvider>{children}</TransactionProvider>
        </SessionProvider>
    );
};
