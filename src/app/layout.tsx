import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/page-header";
import BottomNav from "@/components/bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "./_app";
import Footer from "@/components/footer";
import ToTopButton from "@/components/totop-button";
import ThemeWrapper from "./theme-wrapper";
import LayoutWrapper from "./layout-wrapper";

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
            <ThemeWrapper>
                <NextAuthProvider>
                    <Header />
                    <LayoutWrapper>
                        <div className="px-4 pt-2 pb-16 min-h-screen bg-slate-50 md:bg-white md:container">
                            {children}
                        </div>
                    </LayoutWrapper>
                    <Footer />
                    <ToTopButton />
                </NextAuthProvider>
                <Toaster />
            </ThemeWrapper>
        </html>
    );
}
