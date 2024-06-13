import { priceMask } from "@/Helpers";
import { IPromo } from "@/types/transaction";
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
      className={`rounded-xl shadow-sm flex cursor-pointer text-theme-secondary-900 hover:bg-slate-50 ${
        promo.id == selected?.id
          ? "border-2 divide-theme-secondary-500 border-theme-secondary divide-x-2 divide-dashed "
          : "border-2"
      }`}
      onClick={() => {
        if (promo.id != selected?.id) setSelected(promo);
        else setSelected();
      }}
    >
      <div className="flex flex-col items-center justify-center p-4 w-[12rem] bg-white rounded-s-xl">
        <p></p>
        <p className="font-bold">
          {promo.promo_type == "percentage"
            ? `${promo.promo_value}%`
            : priceMask(promo.promo_value)}
        </p>
        <p className="text-xs text-center">
          {promo.limit_count && promo.limit_count > 0
            ? `Max ${promo.limit_count}x`
            : "No Limit"}
        </p>
      </div>
      <div className="items-center justify-center pt-4 w-full rounded-tr-xl  rounded-br-xl bg-gradient-to-br from-theme-secondary-50 to-theme-secondary-200">
        <div className="pr-4 pl-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-xs py-1 px-2 rounded bg-theme-secondary-200 text-theme-secondary-900 font-medium w-fit">
              {promo.code}
            </p>
          </div>
          <div className="flex justify-between items-center rounded-xl px-2 py-1 bg-white">
            <p className="text-sm font-medium">
              {promo.ref_product
                ? promo.ref_product.product_name
                : promo.ref_category?.name}
            </p>
          </div>
          <p className="text-xs w-full">
            →{" "}
            <span className="ml-2">
              {format(parseISO(promo.finish_at), "dd MMMM yyy")}
            </span>
          </p>
        </div>
        {isSecret ? (
          <div className="bg-theme-primary-400 text-white mt-4 rounded-br">
            <p className="text-center text-xs font-semibold">Secret Promo</p>
          </div>
        ) : (
          <div className="pb-4"></div>
        )}
      </div>
    </div>
  );
}

export default PromoCard;
