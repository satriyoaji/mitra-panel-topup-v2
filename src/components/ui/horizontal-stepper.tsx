import { ITransactionHistory } from "@/types/transaction";
import { format, parseISO } from "date-fns";
import React from "react";

function Bullets({ status = 0 }: { status: number }) {
    if (status == 0)
        return (
            <span className="absolute flex items-center justify-center w-6 h-6 bg-green-200 rounded-full start-[-.8rem] ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                <svg
                    className="w-2.5 h-2.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                    />
                </svg>
            </span>
        );
    else if (status == 1)
        return (
            <span className="absolute animate-spin flex items-center justify-center w-6 h-6 bg-white rounded-full start-[-.75rem] ring-4 ring-white border-orange-400 border-s-4"></span>
        );
    else
        return (
            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full start-[-.8rem] ring-4 ring-white dark:ring-gray-900 dark:bg-gray-900"></span>
        );
}

function HorizontalStepper({ list }: { list: ITransactionHistory[] }) {
    return (
        <div>
            <p className="mb-4 font-medium">Order History</p>
            <ol className="relative text-gray-700 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-2">
                {list.map((val, idx) => (
                    <li className="mb-8 ms-8" key={idx}>
                        <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full start-[-.55rem] mt-0.5 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-900"></span>
                        <h3 className="font-medium text-sm leading-tight">
                            {val.status_name}
                        </h3>
                        <div className="text-xs text-muted-foreground mt-1">
                            {format(
                                parseISO(val.timestamp),
                                "dd/MM/yyyy, hh:mm:ss"
                            )}
                        </div>
                        {/* {val.loading ?
                            <p className="text-xs text-muted-foreground font-semibold">
                                On Progress
                            </p> :
                            <p className="text-xs text-muted-foreground font-semibold">
                                Completed
                            </p>
                        } */}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default HorizontalStepper;
