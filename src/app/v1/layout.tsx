import Header from "@/components/page-header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import ThemeWrapper from "./theme-wrapper";
import LayoutWrapper from "./layout-wrapper";
import HelpButton from "@/components/help-button";
import { Metadata, ResolvingMetadata } from "next";
import { ISiteProfile } from "@/types/utils";
import { headers } from "next/headers";
import { GetAuthHeader, GetCredHeader } from "../api/api-utils";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

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
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: setting.title,
      description: setting.description,
      keywords: setting.keywords,
      openGraph: {
        images: [setting.logo_url, ...previousImages],
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
