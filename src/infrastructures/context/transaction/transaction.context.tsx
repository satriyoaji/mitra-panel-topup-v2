"use client";

import {
    IAccount,
    IPaymentMethod,
    IProductCategory,
    IPromo,
    ITransaction,
    LooseObject,
    TProduct,
} from "@/Type";
import React from "react";

export type TransactionSetCategory = {
    action: "SET_CATEGORY";
    payload: IProductCategory | null;
};
export type TransactionSetProduct = {
    action: "SET_PRODUCT";
    payload: TProduct;
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
    action: "SET_PAYMENT";
    payload: IPaymentMethod;
};
export type TransactionSetAccount = {
    action: "SET_ACCOUNT";
    payload: IAccount;
};
export type TransactionSetXenditBank = {
    action: "SET_BANK";
    payload: string;
};

export type TransactionDispatch =
    | TransactionSetCategory
    | TransactionSetForm
    | TransactionSetProduct
    | TransactionSetPromo
    | TransactionSetAccount
    | TransactionSetXenditBank
    | TransactionSetPayment;

export interface ITransactionContext {
    data: ITransaction;
    dispatch: (
        data:
            | TransactionSetCategory
            | TransactionSetForm
            | TransactionSetProduct
            | TransactionSetPromo
            | TransactionSetPayment
            | TransactionSetAccount
            | TransactionSetXenditBank
    ) => void;
}

const TransactionContext = React.createContext<ITransactionContext | null>(
    null
);

export default TransactionContext;
