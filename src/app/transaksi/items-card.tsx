import { priceMask } from "@/Helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type TItemsCard = {
    onEditClick: () => void;
    date: Date;
    status: "success" | "on progress" | "failed";
    name: string;
    product: string;
    id: string;
    icon: string;
    price: number;
};

function ItemsCard(props: TItemsCard) {
    return (
        <Card className="flex">
            <img
                alt="Remy Sharp"
                className="rounded-s-xl border bg-card text-card-foreground shadow w-24 object-cover"
                src={props.icon}
            />
            <div className="flex justify-between w-full my-2 mx-4">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <p className="text-xs">{props.date.toDateString()}</p>
                        {props.status === "success" ? (
                            <Badge variant="success">Success</Badge>
                        ) : props.status === "failed" ? (
                            <Badge variant="destructive">Failed</Badge>
                        ) : (
                            <Badge variant="warning">On Progress</Badge>
                        )}
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex items-center">
                                <p className="text-sm">{props.name}</p>
                                <p className="mx-2">{"-"}</p>
                                <p className="text-xs font-semibold">
                                    {props.product}
                                </p>
                            </div>
                            <p className="text-sm font-semibold">
                                {priceMask(props.price, undefined)}
                            </p>
                        </div>
                        <Button variant="outline" onClick={props.onEditClick}>
                            Detail
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ItemsCard;
