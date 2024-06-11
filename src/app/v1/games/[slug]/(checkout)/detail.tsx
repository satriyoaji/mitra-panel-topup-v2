"use client";

import { getTotalPrice, priceMask } from "@/Helpers";
import { ITransaction } from "@/Type";
import TransactionDetail from "@/components/transaction-detail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { ICategoryForm, ITransactionCreate } from "@/types/transaction";
import { isWithinInterval, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface IDetailProp extends ITransaction {
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

export function Purchase({
  product,
  category,
  promo,
  isOpen,
  onOpenChange,
  form,
  bank,
}: IDetailProp) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const { data: session } = useSession();

  async function createTransaction() {
    if (
      !data.account ||
      !data.payment ||
      !data.account ||
      !data.product ||
      !data.category
    )
      return false;

    var payload: ITransactionCreate = {
      category_key: data.category?.key,
      email: data.account?.email,
      phone: data.account?.noWhatsapp,
      product_key: data.product?.key,
      payment_chanel: data.payment,
      payment_method: data.payment,
    };

    if (data.form) {
      var forms: ICategoryForm[] = [];
      for (const [key, value] of Object.entries(data.form)) {
        forms.push({
          key,
          value,
        });
      }

      payload.form_data = forms;
    }

    console.log(payload);

    // var res = await fetch("/api/transaction", {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });

    // if (res.ok) return true;
    // return false;
  }

  if (!product) return <></>;
  return (
    <Dialog open={isOpen} defaultOpen={false} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Detail Pesanan</DialogTitle>
          <DialogDescription>
            Cek pesanan anda terlebih dahulu sebelum melanjutkan pembayaran.
          </DialogDescription>
        </DialogHeader>
        <TransactionDetail
          bank={bank}
          category={category}
          form={form}
          product={product}
          promo={promo}
        />
        <div>
          <Separator className="mb-2" />
          <div className="flex justify-between items-center">
            <div className="text-xs space-y-0.5">
              <p className="">Total Harga</p>
              <p className="font-semibold text-sm">
                {priceMask(getTotalPrice(product, promo, bank))}
              </p>
            </div>

            <Button type="submit" size="sm" onClick={createTransaction}>
              Bayar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
