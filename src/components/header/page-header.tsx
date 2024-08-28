"use client";
import React from "react";
import { ISiteProfile } from "@/types/utils";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";

function Header({ profile }: { profile?: ISiteProfile }) {
  return (
    <header className="w-full flex justify-center z-20 bg-white items-center top-0 sticky p-1 border-b">
      <MobileHeader profile={profile} />
      <DesktopHeader profile={profile} />
    </header>
  );
}

export default Header;
