import { priceMask } from "@/Helpers";
import { ITransactionHistoryList } from "@/Type";
import { Card } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import BadgeTransaksi from "../badge-transaksi";
import CountdownCard from "@/app/dashboard/countdown-card";
import Image from "next/image";

export interface TItemsCard {
  data: ITransactionHistoryList;
}

function ItemsCard(props: TItemsCard) {
  var date = format(parseISO(props.data.date), "dd MMM yyyy, hh:mm");

  return (
    <Link href={`/transaksi/${props.data.transaction_code}`}>
      <Card className="flex hover:bg-zinc-50">
        <div className="flex justify-between w-full my-2 mx-4">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <p className="text-muted-foreground text-xs">
                  {props.data.transaction_code}
                </p>
                <BadgeTransaksi status={props.data.status} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground text-right">
                  {date}
                </p>
              </div>
            </div>
            <div className="flex justify-between pt-1">
              <p className="font-medium">
                {props.data.category_name} - {props.data.product_name}
              </p>
            </div>
            <div className="flex justify-between items-end mt-1.5">
              <p className="text-sm font-medium text-right">
                {priceMask(props.data.price)}
              </p>
              <div className="space-y-2 flex justify-end items-end space-x-2">
                {props.data.expired_at ? (
                  <CountdownCard
                    date={parseISO(props.data.expired_at)}
                    theme="light"
                  />
                ) : null}
                {props.data.payment_logo ? (
                  <Image
                    alt={props.data.payment_channel}
                    src={props.data.payment_logo}
                    height={50}
                    width={50}
                  />
                ) : (
                  <p className="text-sm font-medium text-right p-0">
                    🪙 {props.data.payment_channel}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default ItemsCard;
