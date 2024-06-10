import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function PublicPage() {
  return (
    <div
      className="bg-no-repeat bg-center"
      style={{
        backgroundImage:
          'url("/illustration/DrawKit Larry Character Illustration (10).svg")',
      }}
    >
      <div className="h-full min-h-[80vh] flex pt-16 bg-white bg-opacity-95 items-center flex-col">
        <div className="max-w-[60rem] bg-opacity-90 min-h-full">
          <div>
            <p>LACAK TRANSAKSI</p>
            <h3 className="text-3xl max-w-[40rem] mt-4 font-semibold">
              Lacak pesanan kamu hanya dengan nomor telepon atau nomor invoice
            </h3>
            <div className="flex items-center w-full mt-8 gap-2">
              <Input
                className="w-full bg-white"
                placeholder="Masukkan nomor handphone atau invoice"
              />
              <Button>Cari</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicPage;
