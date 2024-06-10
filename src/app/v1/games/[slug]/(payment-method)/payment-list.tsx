import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import mandiri from "../../../../../public/Bank/Mandiri.png";
import bni from "../../../../../public/Bank/BNI.png";
import btn from "../../../../../public/Bank/BTN.png";
import bri from "../../../../../public/Bank/BRI.png";
import SelectedPayment from "./selected-payment";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { priceMask } from "@/Helpers";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { IBank, IPaymentGroup } from "@/Type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function PaymentList({ paymentGroup }: { paymentGroup: IPaymentGroup[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;

  return (
    <>
      <SelectedPayment onClick={() => setIsOpen((val) => (val = !val))} />
      <Accordion type="single" className="mt-4 px-2" collapsible>
        {paymentGroup.map((item, idx) => (
          <AccordionItem key={idx.toString()} value={idx.toString()}>
            <AccordionTrigger>
              <p className="text-muted-foreground text-xs">{item.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              {item.payment_method.map((item) => (
                <div
                  key={item.name}
                  className={`text-center flex hover:bg-theme-secondary-50 justify-between items-center px-2 py-2 cursor-pointer`}
                  onClick={(e) => {
                    dispatch({
                      action: "SET_BANK",
                      payload: item,
                    });
                    setIsOpen(false);
                  }}
                >
                  <div className="md:flex items-center gap-4">
                    {item.image_url ? (
                      <Image
                        alt={item.name}
                        src={item.image_url}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <p className="text-xl text-left">💳</p>
                    )}
                    <p className="text-xs mt-2 text-left md:mt-0">
                      {item.name}
                    </p>
                  </div>
                  {item.fee_amount > 0 && (
                    <>
                      <p className="text-xs font-medium text-muted-foreground">
                        +{priceMask(item.fee_amount)}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default PaymentList;
