import { priceMask } from "@/Helpers";
import { ITransactionHistoryList } from "@/Type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import BadgeTransaksi from "../badge-transaksi";
import CountdownCard from "@/app/dashboard/countdown-card";

export interface TItemsCard {
  data: ITransactionHistoryList;
}

function ItemsCard(props: TItemsCard) {
  var date = format(parseISO(props.data.date), "dd MMM yyyy, hh:mm:ss");

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
                <p className="text-xs text-muted-foreground">{date}</p>
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
              <div className="space-y-2">
                <p className="text-sm font-medium text-right">
                  {props.data.payment_channel}
                </p>
                <CountdownCard date={parseISO(props.data.date)} theme="light" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default ItemsCard;
