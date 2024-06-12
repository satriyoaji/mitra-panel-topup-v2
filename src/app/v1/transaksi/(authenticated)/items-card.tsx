import { priceMask } from "@/Helpers";
import { ITransactionHistoryList } from "@/Type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import BadgeTransaksi from "../badge-transaksi";

export interface TItemsCard {
  onEditClick: () => void;
  data: ITransactionHistoryList;
}

function ItemsCard(props: TItemsCard) {
  var date = format(parseISO(props.data.date), "dd MMM yyyy, hh:mm:ss");

  return (
    <Card className="flex">
      <div className="flex justify-between w-full my-2 mx-4">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <p className="text-muted-foreground text-xs">
                {props.data.transaction_code}
              </p>
              <Separator className="h-4" orientation="vertical" />
              <p className="text-xs text-muted-foreground hidden md:block">
                {date}
              </p>
            </div>
            <div>
              <BadgeTransaksi status={props.data.status} />
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between pt-1">
            <div className="flex space-x-4 h-full ml-2">
              <div className="mt-1">
                <SketchLogoIcon />
              </div>
              {/* <img
                alt="Remy Sharp"
                className="rounded-sm border bg-card text-card-foreground shadow w-12 object-cover"
                src={""}
              /> */}
              <div>
                <div className="flex flex-col">
                  <p className="text-xs font-medium">
                    {props.data.category_name}
                  </p>
                  <p className="text-sm">{props.data.product_name}</p>
                  <p className="text-xs text-muted-foreground md:hidden mt-1.5">
                    {date}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="text-sm font-medium">
                  {priceMask(props.data.price)}
                </p>
              </div>
              <div>
                <Link href={`/transaksi/${props.data.transaction_code}`}>
                  <Button size="sm" variant="outline">
                    Detail
                  </Button>
                </Link>
              </div>
              {/* <div className="hidden md:block">
                <Button size="sm" variant="outline" onClick={props.onEditClick}>
                  Detail
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ItemsCard;
