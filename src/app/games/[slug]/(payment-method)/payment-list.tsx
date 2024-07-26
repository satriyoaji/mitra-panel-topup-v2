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
import { Card } from "@/components/ui/card";

function PaymentList({ paymentGroup }: { paymentGroup: IPaymentGroup[] }) {
  const { dispatch, data } = useContext(
    TransactionContext
  ) as ITransactionContext;

  return (
    <>
      <Accordion type="multiple" className="mt-4 px-2">
        {paymentGroup.map((group, idx) => (
          <AccordionItem key={idx.toString()} value={idx.toString()}>
            <AccordionTrigger>
              <p className="text-muted-foreground text-xs">{group.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
                {group.payment_method.map((item) => (
                  <Card
                    key={item.name}
                    className={`flex hover:bg-theme-primary-50 rounded-lg justify-between items-center px-3 py-3 cursor-pointer ${
                      data.payment?.payment_channel == item.payment_channel &&
                      "border border-theme-primary-500"
                    }`}
                    onClick={(e) => {
                      dispatch({
                        action: "SET_PAYMENT_METHOD",
                        payload: item,
                      });
                    }}
                  >
                    <div>
                      <p className="text-xs mt-2 md:mt-0">{item.name}</p>
                      {item.fee_amount > 0 && (
                        <p className="text-xs font-medium text-muted-foreground">
                          {!data.product && "+"}
                          {data.product
                            ? data.product.discounted_price
                              ? priceMask(
                                  item.fee_amount +
                                    data.product.discounted_price
                                )
                              : priceMask(item.fee_amount + data.product.price)
                            : priceMask(item.fee_amount)}
                        </p>
                      )}
                    </div>
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
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default PaymentList;
