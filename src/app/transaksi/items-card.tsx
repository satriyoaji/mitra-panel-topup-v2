import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type prop = {
    onEditClick: () => void;
};

function ItemsCard(props: prop) {
    return (
        <Card className="flex">
            <img
                alt="Remy Sharp"
                className="rounded-s-xl border bg-card text-card-foreground shadow w-24"
                src="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
            />
            <div className="flex justify-between w-full my-2 mx-4">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <p className="text-xs">24 October 2023</p>
                        <Badge variant="success">Success</Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm">FIFA 23</p>
                            <p className="text-xs font-semibold">
                                20.000 Diamonds
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
