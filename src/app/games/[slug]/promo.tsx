import { IPromo } from "@/Type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import PromoCard from "./promo-card";
import { useToast } from "@/components/ui/use-toast";

function Promo({
    category_uuid,
    product_id,
    listProductId,
}: {
    category_uuid: string;
    product_id?: string;
    listProductId: string[];
}) {
    const [selectedPromo, setSelectedPromo] = useState<string>();
    const [promos, setPromos] = useState<IPromo[]>([]);
    const [productPromos, setProductPromos] = useState<IPromo[]>([]);
    const [hiddenPromo, setHiddenPromo] = useState<IPromo>();
    const [hiddenPromoCode, setHiddenPromoCode] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const useOtherPromo = async () => {
        await getHiddenPromo();
    };

    const getData = async () => {
        setLoading(true);
        let qParams = new URLSearchParams();

        if (product_id) qParams.append("product_uuid", product_id);
        else qParams.append("category_uuid", category_uuid);

        var res = await fetch(`/api/products/promo?` + qParams);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (product_id) {
                    setProductPromos(result.data);
                    setLoading(false);
                    return;
                }

                setPromos(result.data);
                setLoading(false);
                return;
            }

            if (product_id) {
                setProductPromos([]);
                setLoading(false);
                return;
            }

            setPromos([]);
        }
        setLoading(false);
    };

    const getHiddenPromo = async () => {
        setLoading(true);
        var res = await fetch(`/api/products/promo/${hiddenPromoCode}?`);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (
                    (result.data.ref_category &&
                        result.data.ref_category?.uuid == category_uuid) ||
                    (result.data.ref_product &&
                        listProductId.some(
                            (i) => i === result.data.ref_product?.uuid
                        ))
                ) {
                    setHiddenPromo(result.data);
                    setLoading(false);
                    setSelectedPromo(result.data.id);
                    return;
                }
            }
        }

        toast({
            title: "Failed",
            description: "Promo Tidak Ditemukan",
            variant: "destructive",
        });
        setHiddenPromo(undefined);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, [product_id]);

    return (
        <div className="space-y-3">
            <div className="mt-2 flex space-x-2 items-center">
                <Input
                    placeholder="Punya Kode Promo? Masukan di sini"
                    value={hiddenPromoCode}
                    onChange={(e) => setHiddenPromoCode(e.target.value)}
                />
                <Button disabled={loading} size="sm" onClick={useOtherPromo}>
                    {loading ? "Loading..." : "Get Promo"}
                </Button>
            </div>
            {hiddenPromo && (
                <PromoCard
                    promo={hiddenPromo}
                    selected={selectedPromo}
                    setSelected={setSelectedPromo}
                    isSecret
                />
            )}
            {productPromos.map((i) => (
                <PromoCard
                    promo={i}
                    selected={selectedPromo}
                    setSelected={setSelectedPromo}
                />
            ))}
            {promos.map((i) => (
                <PromoCard
                    promo={i}
                    selected={selectedPromo}
                    setSelected={setSelectedPromo}
                />
            ))}
        </div>
    );
}

export default Promo;
