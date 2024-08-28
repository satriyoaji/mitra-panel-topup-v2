"use client";
import React from "react";
import { ISiteProfile } from "@/types/utils";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";

function Header({ profile }: { profile?: ISiteProfile }) {
  return (
    <>
      <MobileHeader profile={profile} />
      <DesktopHeader profile={profile} />
    </>
  );
}

export default Header;
