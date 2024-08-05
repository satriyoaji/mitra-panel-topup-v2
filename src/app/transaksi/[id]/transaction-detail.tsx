"use client";

import { InfoCircledIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import { priceMask } from "@/Helpers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { ITransactionHistoryDetail } from "@/types/transaction";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
import VAPayment from "./(payment)/va-payment";
import QRPayment from "./(payment)/qr-payment";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import BadgeTransaksi from "../badge-transaksi";
import LinkPayment from "./(payment)/link-payment";
import { isFuture, parseISO } from "date-fns";
import CountdownCard from "@/app/dashboard/countdown-card";

function TransactionHistoryDetail({ id }: { id: string }) {
  const [data, setData] = useState<ITransactionHistoryDetail | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      var re = await fetch(`/api/transaction/${id}`);

      var res = await re.json();
      setLoading(false);
      setData(res.data);
    })();
  }, [id]);

  if (loading) return <Loading />;

  if (data)
    return (
      <div className="pt-4 px-2 flex w-full justify-center">
        <div className="max-w-5xl w-full">
          <div className="flex justify-between items-center">
            <div className="sm:flex items-center space-x-2">
              <p className="font-medium ml-2 text-xl">Detail Transaksi</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-xs text-muted-foreground">
                    {data.transaction_code}
                  </p>
                  <CopyToClipboard text={data.transaction_code} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-2">
            <Alert className="bg-red-50 text-red-900">
              <InfoCircledIcon className="text-white" />
              <AlertTitle>Penting!</AlertTitle>
              <AlertDescription className="text-xs">
                Pastikan anda menyimpan nomor transaksi dan email serta nomor
                telpon yang anda gunakan dalam proses transaksi.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex flex-row justify-stretch items-center">
            <div className="grid md:grid-cols-2 w-full gap-4 h-full mt-2 auto-rows-fr">
              <div className="w-full bg-background h-full px-4 pt-4 pb-6 rounded-lg shadow flex-1">
                <p className="font-medium text-lg text-red-800">
                  Rincian Transaksi
                </p>
                <div className="mt-4 space-y-4 h-full">
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">
                      Order Expired
                    </p>
                    {data.payment_information.expired_at &&
                    isFuture(parseISO(data.payment_information.expired_at)) ? (
                      <CountdownCard
                        date={parseISO(data.payment_information.expired_at)}
                      />
                    ) : (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Produk</p>
                    <p className="">{data.category_name}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Item</p>
                    <p className="">{data.product_name}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Informasi</p>
                    <div>
                      <p>{data.customer_data}</p>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Status</p>
                    <div>
                      <BadgeTransaksi status={data.status} />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">
                      Informasi Kontak
                    </p>
                    <div className="text-right space-y-1">
                      <p>{data.email}</p>
                      <p>{data.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-background h-full px-4 pt-4 pb-6 rounded-lg shadow flex-1">
                <div>
                  <p className="font-medium text-lg text-red-800">
                    Rincian Pembayaran
                  </p>
                  <div className="mt-4 space-y-4 h-full">
                    <div className="flex justify-between w-full">
                      <p className="text-muted-foreground text-sm">
                        Pilihan Pembayaran
                      </p>
                      <div className="flex flex-col items-end">
                        <p className="text-sm">
                          {`${data.payment_information.payment_method.replace(
                            "_",
                            " "
                          )} - ${data.payment_information.payment_channel}`}
                        </p>
                        {data.payment_information.image_url ? (
                          <Image
                            className="mt-1.5"
                            alt={data.payment_information.payment_method}
                            src={data.payment_information.image_url}
                            width={50}
                            height={50}
                          />
                        ) : (
                          <p className="text-xl text-left">💳</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-muted-foreground text-sm">
                        Total Pembayaran
                      </p>
                      <p className="font-semibold text-green-600">
                        {priceMask(data.payment_information.payment_amount)}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="my-3 w-full" />
                <div>
                  <p className="font-medium text-lg text-red-800">
                    Tujuan Pembayaran
                  </p>
                  <div className="mt-4 space-y-4 h-full">
                    {data.payment_information.payment_method ==
                    "VIRTUAL_ACCOUNT" ? (
                      <VAPayment payment={data.payment_information} />
                    ) : data.payment_information.payment_method == "EWALLET" ? (
                      <LinkPayment payment={data.payment_information} />
                    ) : (
                      <QRPayment payment={data.payment_information} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TransactionHistoryDetail;
