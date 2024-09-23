import React from "react";
import Profile from "@/components/header/profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <div className={`flex justify-center w-full`}>
      <div className={`bg-[#F0F8F6] md:pt-4 mx-auto max-w-lg w-full`}>
        <div className="bg-background rounded-b-lg py-4 px-2">
          <Profile />
        </div>
        <Link href="/kebijakan">
          <Button size="sm" className="w-full" variant="link">
            Kebijakan Privasi
          </Button>
        </Link>
        <Link href="/syarat-ketentuan">
          <Button size="sm" className="w-full" variant="link">
            Syarat dan Ketentuan
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
