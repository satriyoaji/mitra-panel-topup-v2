import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/page-header";
import BottomNav from "@/components/bottom-nav";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import ToTopButton from "@/components/totop-button";
import ThemeProvider from "@/infrastructures/context/theme/theme.provider";
import HelpButton from "@/components/help-button";
import { NextAuthProvider } from "./_app";

export const metadata: Metadata = {
  title: "Topup User",
  description: "Topup User Web",
};

export default function RootTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <ThemeProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </ThemeProvider>
    </html>
  );
}
