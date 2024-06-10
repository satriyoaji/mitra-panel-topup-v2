import type { Metadata } from "next";
import Header from "@/components/page-header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import ThemeWrapper from "./theme-wrapper";
import LayoutWrapper from "./layout-wrapper";
import HelpButton from "@/components/help-button";
import RootTemplateLayout from "../template-layout";

export const metadata: Metadata = {
  title: "Topup User",
  description: "Topup User Web",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <LayoutWrapper>
        <div className="px-4 pt-2 pb-16 min-h-screen bg-white md:container">
          {children}
        </div>
      </LayoutWrapper>
      <Footer />
      <HelpButton />
      <Toaster />
    </>
  );
}
