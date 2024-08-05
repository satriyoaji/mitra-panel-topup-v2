import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";
import PWAAlert from "@/components/header/pwa-alert";
import { GetCredHeader } from "./api/api-utils";
import { ISiteProfile } from "@/types/utils";
import Header from "@/components/header/page-header";

const getData = async () => {
  const credentialHeader = GetCredHeader();

  const res = await fetch(`${process.env.API}/site-profile`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
    next: {
      revalidate: 30,
    },
  });

  if (res.ok) {
    var data = await res.json();
    return data.data;
  }

  return undefined;
};

export default async function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: ISiteProfile = await getData();
  return (
    <>
      <PWAAlert profile={data} />
      <Header profile={data} />
      <div>
        <div className={`min-h-[92vh] bg-zinc-50 `}>{children}</div>
        <BottomNav />
      </div>
      <Footer profile={data} />
      {/* <HelpButton /> */}
      <Toaster />
    </>
  );
}
