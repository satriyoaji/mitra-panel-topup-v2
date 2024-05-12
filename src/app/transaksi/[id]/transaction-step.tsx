import HorizontalStepper, {
    TStepper,
} from "@/components/ui/horizontal-stepper";
import { format } from "date-fns";
import React from "react";

const step: TStepper[] = [
    {
        header: "Pemesanan",
        done: true,
        loading: false,
        description: (
            <p className="text-sm mt-1">
                {format(new Date("2023-12-12"), "hh:mm:ss dd MMM yyy")}
            </p>
        ),
    },
    {
        header: "Pembayaran",
        done: true,
        loading: false,
        description: (
            <p className="text-sm mt-1">
                {format(new Date("2023-12-13"), "hh:mm:ss dd MMM yyy")}
            </p>
        ),
    },
    {
        header: "Diproses Seller",
        done: false,
        loading: true,
    },
];

function TransactionStep() {
    return (
        <div className="m-8">
            <HorizontalStepper list={step} />
        </div>
    );
}

export default TransactionStep;
