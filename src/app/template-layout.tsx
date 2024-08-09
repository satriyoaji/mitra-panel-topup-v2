"use client";

import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import BottomNav from "@/components/bottom-nav";
import PWAAlert from "@/components/header/pwa-alert";
import { GetCredHeader } from "./api/api-utils";
import { ISiteProfile } from "@/types/utils";
import Header from "@/components/header/page-header";
import { useContext, useEffect, useState } from "react";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import { HexToHSL } from "@/Helpers";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<ISiteProfile>();
  const { dispatch } = useContext(ThemeContext) as IThemeContext;

  const get = async () => {
    const res = await fetch("/api/site-profile");
    if (res.ok) {
      var body = await res.json();
      setProfile(body.data);
      dispatch({
        action: "SET_PRIMARY_COLOR",
        payload: body.data.theme,
      });
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: ` :root {
                             --primary: ${HexToHSL(
                               profile?.theme_color ?? "#000"
                             )};
                           }`,
        }}
      />
      <PWAAlert profile={profile} />
      <Header profile={profile} />
      <div>
        <div className={`min-h-[92vh] bg-zinc-50 `}>{children}</div>
        <BottomNav />
      </div>
      <Footer profile={profile} />
      {/* <HelpButton /> */}
      <Toaster />
    </>
  );
}
