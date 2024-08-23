import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  if (session) return redirect("/profile");

  return <>{children}</>;
}

export default Layout;
