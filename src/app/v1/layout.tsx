import Header from "@/components/page-header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import LayoutWrapper from "./layout-wrapper";
import HelpButton from "@/components/help-button";
import { Metadata } from "next";
import { ISiteProfile } from "@/types/utils";
import { GetCredHeader } from "../api/api-utils";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();

  // fetch data
  const res = await fetch(`${process.env.API}/site-profile`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
  });

  if (res.ok) {
    var data = await res.json();
    var setting: ISiteProfile = data.data;

    // optionally access and extend (rather than replace) parent metadata

    return {
      title: setting.title,
      description: setting.description,
      keywords: setting.keywords,
      openGraph: {
        images: [setting.logo_url],
      },
    };
  }

  return {};
}

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
