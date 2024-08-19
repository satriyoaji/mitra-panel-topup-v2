import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import SearchList from "./search-list";

function PublicPage() {
  return (
    <div
      className="bg-no-repeat bg-center"
      style={{
        backgroundImage:
          'url("/assets/illustration/DrawKit Larry Character Illustration (10).svg")',
      }}
    >
      <div className="h-full min-h-[88vh] flex bg-opacity-95 items-center flex-col rounded-xl">
        <div className="max-w-5xl bg-opacity-90 px-6 pt-0 md:pt-8 bg-background rounded-xl mb-4 w-full min-h-full">
          <div className="w-full min-h-[88vh]">
            <div className="hidden md:block">
              <p>LACAK TRANSAKSI</p>
              <h3 className="text-3xl max-w-[40rem] mt-4 font-semibold">
                Lacak pesanan kamu hanya dengan nomor invoice
              </h3>
            </div>
            <SearchList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
