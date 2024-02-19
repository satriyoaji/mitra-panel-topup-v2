import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/page-header";
import BottomNav from "@/components/bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "./_app";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import ToTopButton from "@/components/totop-button";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Topup User",
    description: "Topup User Web",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background antialiased bg-slate-200"
                )}
            >
                <NextAuthProvider>
                    <main className="max-w-xl bg-white mx-auto min-h-screen">
                        <Header />
                        <div className="px-4 pt-2 pb-16 min-h-screen bg-slate-50">
                            {children}
                        </div>
                        <BottomNav />
                        <Footer />
                        <ToTopButton />
                    </main>
                </NextAuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
