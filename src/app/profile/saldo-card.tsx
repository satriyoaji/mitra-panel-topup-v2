import React from "react";

function SaldoCard(props: { balance: number }) {
  return (
    <div className="flex px-4 py-3 w-full rounded-xl justify-between gap-4 items-center bg-theme-primary-50 border border-theme-primary-100">
      <p className="text-sm text-theme-primary-700">Saldo Points</p>
      <p className="font-medium text-theme-primary-800">
        {props.balance} Points
      </p>
    </div>
  );
}

export default SaldoCard;
