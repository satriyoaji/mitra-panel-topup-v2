"use client";

import "./globals.css";
import ThemeProvider from "@/infrastructures/context/theme/theme.provider";
import { SessionProvider } from "next-auth/react";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";
import { useContext, useEffect, useState } from "react";
import { ISiteProfile } from "@/types/utils";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import { HexToHSL } from "@/Helpers";
import Loading from "./loading";

export default function RootTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<ISiteProfile>();
  const [loading, setLoading] = useState(true);

  const get = async () => {
    setLoading(true);
    const res = await fetch("/api/site-profile");
    if (res.ok) {
      var body = await res.json();
      setProfile(body.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  if (loading) return <Loading />;

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
      <ThemeProvider>
        <SessionProvider>
          <TransactionProvider>{children}</TransactionProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
