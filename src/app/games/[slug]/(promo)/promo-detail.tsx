import CountdownCard from "@/app/dashboard/countdown-card";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IPromoDetail } from "@/types/transaction";
import { parseISO } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function PromoDetail({ id, onClose }: { id?: string; onClose: () => void }) {
    const [promo, setPromo] = useState<IPromoDetail | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getData = async (idIn: string) => {
        var res = await fetch(`/api/products/promo/${idIn}`);
        if (res.ok) {
            var data = await res.json();
            setPromo(data.data);
            return;
        }

        setPromo(undefined);
    };

    useEffect(() => {
        if (id) {
            getData(id);
            setOpen(true);
        } else {
            setPromo(undefined);
            setOpen(false);
            onClose();
        }
    }, [id]);

    const onOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) {
            onClose();
            setPromo(undefined);
        }
    };

    if (id)
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        promo && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="flex justify-between">
                                        {promo.name}
                                        <div className="mr-3">
                                            <CountdownCard
                                                date={parseISO(
                                                    promo.time_finish
                                                )}
                                            />
                                        </div>
                                    </DialogTitle>
                                    <DialogDescription>
                                        {promo.promo_code}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3">
                                    <Image
                                        src={promo.image_url}
                                        width={100}
                                        height={100}
                                        alt={promo.name}
                                    />
                                    <div
                                        className="text-xs text-muted-foreground"
                                        dangerouslySetInnerHTML={{
                                            __html: promo?.description,
                                        }}
                                    ></div>
                                    <div className="flex gap-1 flex-wrap w-full">
                                        {promo?.products.map((i) => (
                                            <div>
                                                <Badge>{i}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </DialogContent>
            </Dialog>
        );
    return null;
}

export default PromoDetail;
