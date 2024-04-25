import React from "react";

export type TStepper = {
    header: string;
    description?: React.JSX.Element;
    done: boolean;
};

function Bullets({ done }: { done: boolean }) {
    if (done)
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
    else
        return (
            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full start-[-.8rem] ring-4 ring-white dark:ring-gray-900 dark:bg-gray-900"></span>
        );
}

function HorizontalStepper({ list }: { list: TStepper[] }) {
    return (
        <div>
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {list.map((val) => (
                    <li className="mb-10 ms-6">
                        <Bullets done={val.done} />
                        <h3 className="font-medium leading-tight">
                            {val.header}
                        </h3>
                        <div>{val.description}</div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default HorizontalStepper;
