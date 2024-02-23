import { priceMask } from "@/Helpers";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import TransactionContext, {
    ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { useSession } from "next-auth/react";
import React, { RefObject, useContext, useMemo, useState } from "react";
import { Purchase } from "./detail";
import { TProductForm } from "@/Type";

function CheckoutAction({
    formRef,
    confirmationRef,
}: {
    formRef: RefObject<HTMLDivElement>;
    confirmationRef: RefObject<HTMLDivElement>;
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

    const getTotalPrice: string = useMemo(() => {
        let num = 0;

        if (data.product) {
            num += data.product.sale_price;
            if (data.product.flash_sales)
                num -= data.product.flash_sales[0].discount_price;
            if (data.promo) {
                if (data.promo.promo_type == "fix")
                    num -= data.promo.promo_value;
                else
                    num -=
                        (data.promo.promo_value * data.product.sale_price) /
                        100;
            }
        }

        return priceMask(num);
    }, [data.product, data.promo]);

    return (
        <>
            <div className="sticky bottom-0 w-full pb-1 pt-1.5 rounded-sm bg-black flex items-center justify-between px-4">
                <div>
                    <h4 className="text-white text-xs">
                        {session ? "Transfer + 10.000 Point" : "Transfer"}
                    </h4>
                    <h4 className="text-white text-lg font-bold">
                        {getTotalPrice}
                    </h4>
                </div>
                <div className="">
                    <Button variant="secondary" size="sm" onClick={checkout}>
                        Checkout
                    </Button>
                </div>
            </div>
            <Purchase
                payment="transfer & points"
                onOpenChange={setIsCheckoutOpen}
                isOpen={isCheckoutOpen}
                category={data.category}
                product={data.product}
                promo={data.promo}
                form={data.form}
            />
        </>
    );
}

export default CheckoutAction;
