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
            <div className="flex justify-between w-full my-3 mx-3">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <p className="text-muted-foreground text-xs">
                                NDJKAS89DSA
                            </p>
                        </div>
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
                        <div className="flex space-x-4 items-center">
                            <img
                                alt="Remy Sharp"
                                className="rounded-sm border bg-card text-card-foreground shadow w-12 object-cover"
                                src={props.icon}
                            />
                            <div>
                                <p className="text-xs mb-1">
                                    {props.date.toDateString()}
                                </p>
                                <div className="flex items-center">
                                    <p className="text-sm">{props.name}</p>
                                    <p className="mx-2">{"-"}</p>
                                    <p className="text-xs font-semibold">
                                        {props.product}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Total
                                </p>
                                <p className="text-sm font-semibold mb-2">
                                    {priceMask(props.price, undefined)}
                                </p>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={props.onEditClick}
                            >
                                Detail
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ItemsCard;
