import { GetCookie } from "@/infrastructures/cookieStore";
import React from "react";
import HeaderV1 from "./page-header-v1";
import HeaderV2 from "./page-header-v2";

function PageHeaderWrapper() {
  const version = GetCookie("version");

  if (version == "1") return <HeaderV1 />;
  else return <HeaderV2 />;
}

export default PageHeaderWrapper;
