import { priceMask } from "@/Helpers";
import { IPromo } from "@/Type";
import { format, parseISO } from "date-fns";
import React from "react";

function PromoCard({
    promo,
    selected,
    setSelected,
    isSecret,
}: {
    promo: IPromo;
    selected?: IPromo;
    setSelected: (promo?: IPromo) => void;
    isSecret?: boolean;
}) {
    return (
        <div
            className={`rounded-lg shadow-sm flex cursor-pointer hover:bg-slate-50 ${
                promo.id == selected?.id
                    ? "border-4 divide-black border-black divide-x-4 divide-dashed "
                    : "border-2"
            }`}
            onClick={() => {
                if (promo.id != selected?.id) setSelected(promo);
                else setSelected();
            }}
        >
            <div className="flex flex-col items-center justify-center p-4 w-[12rem] bg-red-100 rounded-s-md">
                <p></p>
                <p className="font-bold">
                    {promo.promo_type == "percentage"
                        ? `${promo.promo_value}%`
                        : priceMask(promo.promo_value)}
                </p>
                <p className="text-xs text-center font-bold">
                    {promo.limit_count
                        ? `Max ${promo.limit_count}x`
                        : "No Limit"}
                </p>
            </div>
            <div className="items-center justify-center pt-4 w-full">
                <div className="pr-4 pl-8">
                    <p className="font-semibold text-xs">{promo.code}</p>
                    <p className="text-sm mt-1.5 font-semibold">
                        {promo.ref_product
                            ? promo.ref_product.product_name
                            : promo.ref_category?.alias}
                    </p>
                    <p className="text-xs">
                        {format(parseISO(promo.finish_at), "dd MMM yyy")}
                    </p>
                </div>
                {isSecret ? (
                    <div className="bg-red-400 text-white mt-4 rounded-br">
                        <p className="text-center text-xs font-semibold">
                            Secret Promo
                        </p>
                    </div>
                ) : (
                    <div className="pb-4"></div>
                )}
            </div>
        </div>
    );
}

export default PromoCard;
