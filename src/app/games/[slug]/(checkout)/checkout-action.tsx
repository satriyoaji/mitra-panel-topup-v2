import { getTotalPrice, priceMask } from "@/Helpers";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { useSession } from "next-auth/react";
import React, { RefObject, useContext, useMemo, useState } from "react";
import { Purchase } from "./detail";

function CheckoutAction({
  formRef,
  confirmationRef,
  paymentRef,
}: {
  formRef: RefObject<HTMLDivElement>;
  confirmationRef: RefObject<HTMLDivElement>;
  paymentRef: RefObject<HTMLDivElement>;
}) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const checkout = () => {
    if (
      data.category?.forms &&
      data.form &&
      Object.keys(data.form).length == data.category.forms.length &&
      Object.values(data.form).every((x) => x === null || x === "")
    )
      return toast({
        title: "Failed",
        description: "Data akun tidak lengkap",
        variant: "destructive",
        action: (
          <ToastAction
            onClick={() =>
              formRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            altText="Go To Form"
          >
            Lengkapi Data
          </ToastAction>
        ),
      });

    if (!data.payment)
      return toast({
        title: "Failed",
        description: "Metode pembayaran belum dipilih",
        variant: "destructive",
        action: (
          <ToastAction
            onClick={() =>
              paymentRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            altText="Go To Form"
          >
            Lengkapi Data
          </ToastAction>
        ),
      });

    if (!session) {
      if (
        data.account &&
        data.account.email !== "" &&
        data.account.noWhatsapp !== ""
      )
        return setIsCheckoutOpen(true);

      setIsCheckoutOpen(false);
      return toast({
        title: "Failed",
        description: "Data Konfirmasi Belum Lengkap",
        variant: "destructive",
        action: (
          <ToastAction
            onClick={() =>
              confirmationRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            altText="Go To Profile"
          >
            Lengkapi Data
          </ToastAction>
        ),
      });
    }

    return setIsCheckoutOpen(true);
  };

  const getTotal: string = useMemo(() => {
    let num = 0;

    if (data.product)
      num += getTotalPrice(data.product, data.promo, data.payment);

    return priceMask(num);
  }, [data.product, data.promo, data.payment]);

  return (
    <>
      <div className="sticky bottom-0 w-full pb-1 pt-2 rounded-xl bg-background md:flex items-center justify-between px-4">
        <div className="grid grid-cols-3 w-full ml-2">
          <div>
            <p className="text-muted-foreground text-xs">Total Belanja</p>
            <h4 className="text-foreground font-semibold">
              {priceMask(data.product?.discounted_price || data.product?.price)}
            </h4>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Payment Charge</p>
            <h4 className="text-foreground font-semibold">
              {priceMask(data.payment?.fee_amount)}
            </h4>
          </div>
          <div>
            <p className="text-foreground text-xs">Total Bayar</p>
            <h4 className="text-foreground text-lg text-green-500 font-semibold">
              {getTotal}
            </h4>
          </div>
        </div>
        <div className="">
          <Button size="sm" className="w-full mt-2 md:mt-0" onClick={checkout}>
            Checkout
          </Button>
        </div>
      </div>
      <Purchase
        payment={data.payment}
        onOpenChange={setIsCheckoutOpen}
        isOpen={isCheckoutOpen}
        category={data.category}
        product={data.product}
        promo={data.promo}
        form={data.form}
        account={data.account}
      />
    </>
  );
}

export default CheckoutAction;
