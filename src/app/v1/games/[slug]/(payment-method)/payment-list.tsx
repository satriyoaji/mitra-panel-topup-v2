import React, { useContext, useState } from "react";
import SelectedPayment from "./selected-payment";
import Image from "next/image";
import { priceMask } from "@/Helpers";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IPaymentGroup } from "@/types/transaction";

function PaymentList({ paymentGroup }: { paymentGroup: IPaymentGroup[] }) {
  const { dispatch } = useContext(TransactionContext) as ITransactionContext;
  console.log(paymentGroup);
  return (
    <>
      <SelectedPayment />
      <Accordion type="single" className="mt-4 px-2" collapsible>
        {paymentGroup.map((group, idx) => (
          <AccordionItem key={idx.toString()} value={idx.toString()}>
            <AccordionTrigger>
              <p className="text-muted-foreground text-xs">{group.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              {group.payment_method.map((item) => (
                <div
                  key={item.name}
                  className={`text-center flex hover:bg-theme-secondary-50 justify-between items-center px-2 py-2 cursor-pointer`}
                  onClick={(e) => {
                    dispatch({
                      action: "SET_PAYMENT_METHOD",
                      payload: item,
                    });
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
