"use client";

import { priceMask } from "@/Helpers";
import { useCountdown } from "@/Hooks";
import { IPromo } from "@/types/transaction";
import { differenceInMinutes, format, parseISO } from "date-fns";
import React, { useEffect } from "react";

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
  const [days, hours, minutes, seconds, isExpired] = useCountdown(
    promo.time_finish
  );

  if (!isExpired)
    return (
      <div
        className={`rounded-xl shadow-sm cursor-pointer text-theme-secondary-900 hover:bg-slate-50 ${
          promo.id == selected?.id
            ? "border-2 border-theme-secondary"
            : "border-2"
        }`}
        onClick={() => {
          if (promo.id != selected?.id) setSelected(promo);
          else setSelected();
        }}
      >
        <div className="flex">
          <div className="flex flex-col items-center justify-center p-4 w-[12rem] bg-background rounded-s-xl">
            <p className="font-bold text-xl">
              {promo.discount_percent > 0
                ? `${promo.discount_percent}%`
                : priceMask(promo.discount_amount)}
            </p>
            {promo.stock && promo.stock > 0 ? (
              <p className="text-xs text-center">Tersisa {promo.stock}</p>
            ) : null}
          </div>
          <div className="items-center justify-center pt-4 w-full rounded-tr-xl bg-gradient-to-br from-theme-secondary-50 to-theme-secondary-200">
            <div className="pr-4 pl-6 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs py-1 px-2 rounded bg-theme-secondary-200 text-theme-secondary-900 font-medium w-fit">
                  {promo.promo_code}
                </p>
              </div>
              <div className="flex-row justify-between items-center rounded-xl px-2 py-1 bg-background">
                <p className="text-sm font-medium">{promo.name}</p>
              </div>
              <p className="text-xs pl-1">{promo.short_description}</p>
            </div>
            {isSecret ? (
              <div className="bg-theme-primary-400 text-white mt-4 rounded-br">
                <p className="text-center text-xs font-semibold">
                  Secret Promo
                </p>
              </div>
            ) : (
              <div className="pb-4"></div>
            )}
          </div>
        </div>
        <div
          className={`px-3 py-2 bg-theme-primary-200 rounded-b-xl text-theme-primary-950`}
        >
          <p className="text-xs">
            Berakhir dalam
            <span className="font-semibold ml-1">
              {days != null && days != 0
                ? `${days} hari`
                : hours != null && hours != 0
                ? `${hours} jam`
                : `${minutes} menit`}
            </span>
          </p>
        </div>
      </div>
    );
}

export default PromoCard;
