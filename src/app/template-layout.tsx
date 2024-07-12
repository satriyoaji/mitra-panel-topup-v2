import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import HelpButton from "@/components/help-button";
import BottomNav from "@/components/bottom-nav";
import { GetCookie } from "@/infrastructures/cookieStore";
import PageHeaderWrapper from "@/components/header/page-header-wrapper";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const version = GetCookie("version");

  return (
    <>
      <PageHeaderWrapper />
      <div className={`${version == "1" ? "md:container md:max-w-7xl" : ""}`}>
        <div
          className={`min-h-screen bg-background ${
            version == "1" ? "bg-theme-primary-50" : ""
          }`}
        >
          {children}
        </div>
        <BottomNav />
      </div>
      <Footer />
      <HelpButton />
      <Toaster />
    </>
  );
}
