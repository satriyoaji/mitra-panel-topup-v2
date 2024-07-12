import { GetCookie } from "@/infrastructures/cookieStore";
import React from "react";

function withVersionWrapper(children: React.ReactNode) {
  const version = GetCookie("version");

  if (version === "1") return children;
  else return <div className="container w-full max-w-5xl">{children}</div>;
}

export default withVersionWrapper;
