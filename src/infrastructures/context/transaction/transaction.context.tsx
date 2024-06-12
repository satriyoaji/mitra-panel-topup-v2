"use client";

import { IProductCategory, LooseObject, TProductItem } from "@/Type";
import { IAccount, IPayment, IPromo, ITransaction } from "@/types/transaction";
import React from "react";

export type TransactionSetCategory = {
  action: "SET_CATEGORY";
  payload: IProductCategory | null;
};
export type TransactionSetProduct = {
  action: "SET_PRODUCT";
  payload: TProductItem;
};
export type TransactionSetPromo = {
  action: "SET_PROMO";
  payload?: IPromo;
};
export type TransactionSetForm = {
  action: "SET_FORM";
  payload: LooseObject;
};
export type TransactionSetPayment = {
  action: "SET_PAYMENT_METHOD";
  payload: IPayment;
};
export type TransactionSetAccount = {
  action: "SET_ACCOUNT";
  payload: IAccount;
};

export type TransactionDispatch =
  | TransactionSetCategory
  | TransactionSetForm
  | TransactionSetProduct
  | TransactionSetPromo
  | TransactionSetAccount
  | TransactionSetPayment;

export interface ITransactionContext {
  data: ITransaction;
  dispatch: (data: TransactionDispatch) => void;
}

const TransactionContext = React.createContext<ITransactionContext | null>(
  null
);

export default TransactionContext;
