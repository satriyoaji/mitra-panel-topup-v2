import React from "react";
import Profile from "@/components/header/profile";
import { Button } from "@/components/ui/button";

function Page() {
  return (
    <div className={`flex justify-center w-full`}>
      <div
        className={`h-[92vh] bg-slate-50 md:pt-4 mx-auto max-w-lg bg-background w-full`}
      >
        <div className="bg-background rounded-b-lg py-4 px-2">
          <Profile />
        </div>
        <Button size="sm" className="w-full" variant="link">
          Kebijan Privasi
        </Button>
        <Button size="sm" className="w-full" variant="link">
          Syarat dan Ketentuan
        </Button>
      </div>
    </div>
  );
}

export default Page;
