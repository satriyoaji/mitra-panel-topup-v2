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
      <div className="h-full min-h-[80vh] flex pt-16 bg-background bg-opacity-95 items-center flex-col">
        <div className="max-w-[60rem] bg-opacity-90 min-h-full">
          <div>
            <p>LACAK TRANSAKSI</p>
            <h3 className="text-3xl max-w-[40rem] mt-4 font-semibold">
              Lacak pesanan kamu hanya dengan nomor invoice
            </h3>
            <SearchList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
