import { GetCookie } from "@/infrastructures/cookieStore";
import React from "react";

function ListGameWrapper({ children }: { children: React.ReactNode }) {
  let version = GetCookie("version");
  if (version == "1") return children;
  return (
    <div className="bg-theme-primary-100 pb-4">
      <div className="md:container md:max-w-7xl">{children}</div>
    </div>
  );
}

export default ListGameWrapper;
