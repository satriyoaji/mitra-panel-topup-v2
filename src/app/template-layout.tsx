"use client";

import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";
import PWAAlert from "@/components/header/pwa-alert";
import { ISiteProfile } from "@/types/utils";
import Header from "@/components/header/page-header";
import { useContext, useEffect, useState } from "react";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<ISiteProfile>();

  const get = async () => {
    const res = await fetch("/api/site-profile");
    if (res.ok) {
      var body = await res.json();
      setProfile(body.data);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <PWAAlert profile={profile} />
      <Header profile={profile} />
      <div>
        <div className={`min-h-[92vh] bg-zinc-50 scroll-mt-16`}>{children}</div>
        <BottomNav />
      </div>
      <Footer profile={profile} />
      {/* <HelpButton /> */}
      <Toaster />
    </>
  );
}
