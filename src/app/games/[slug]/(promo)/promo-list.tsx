import { IPromo, TProduct } from "@/Type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import PromoCard from "./promo-card";
import { useToast } from "@/components/ui/use-toast";

function Promo({
    categoryUuid,
    product,
    listProductId,
    onPromoSelected,
}: {
    categoryUuid: string;
    product?: TProduct;
    listProductId: string[];
    onPromoSelected: (promo?: IPromo) => void;
}) {
    const [selectedPromo, setSelectedPromo] = useState<IPromo>();
    const [promos, setPromos] = useState<IPromo[]>([]);
    const [productPromos, setProductPromos] = useState<IPromo[]>([]);
    const [hiddenPromo, setHiddenPromo] = useState<IPromo>();
    const [hiddenPromoCode, setHiddenPromoCode] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const getData = async (id?: string) => {
        setLoading(true);
        let qParams = new URLSearchParams();

        if (id) qParams.append("product_uuid", id);
        else qParams.append("category_uuid", categoryUuid);

        var res = await fetch(`/api/products/promo?` + qParams);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (id) {
                    setProductPromos(result.data);
                    setLoading(false);
                    return;
                }

                setPromos(result.data);
                setLoading(false);
                return;
            }

            if (id) {
                setProductPromos([]);
                setLoading(false);
                return;
            }

            setPromos([]);
        }
        setLoading(false);
    };

    const isDuplicatePromo = (p: IPromo) => {
        const arr: IPromo[] = promos.concat(productPromos);
        if (hiddenPromo) arr.push(hiddenPromo);

        return arr.some((i) => i.id === p.id);
    };

    const getHiddenPromo = async () => {
        setLoading(true);
        var res = await fetch(`/api/products/promo/${hiddenPromoCode}?`);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (
                    (result.data.ref_category &&
                        result.data.ref_category?.uuid == categoryUuid) ||
                    (result.data.ref_product &&
                        listProductId.some(
                            (i) => i === result.data.ref_product?.uuid
                        ))
                ) {
                    if (!isDuplicatePromo(result.data)) {
                        setHiddenPromo(result.data);
                        setSelectedPromo(result.data.id);
                    } else
                        toast({
                            title: "Failed",
                            description: "Promo Tidak Ditemukan",
                            variant: "destructive",
                        });
                    setLoading(false);
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
    }, []);

    useEffect(() => {
        getData(product?.uuid);
        if (selectedPromo?.ref_product?.uuid != product?.uuid) {
            setSelectedPromo(undefined);
            onPromoSelected();
        }
    }, [product]);

    const selectPromo = (isSecret: boolean, promo?: IPromo) => {
        if (promo) {
            if (
                promo.ref_product &&
                product?.uuid !== promo.ref_product.product_sku
            ) {
                toast({
                    title: "Failed",
                    description:
                        "Promo tidak dapat digunakan untuk product yang dipilih",
                    variant: "destructive",
                });
                return;
            }

            if (
                !isSecret ||
                (isSecret && promo?.ref_product?.uuid == product?.uuid)
            ) {
                setSelectedPromo(promo);
                onPromoSelected(promo);
                return;
            }

            toast({
                title: "Failed",
                description:
                    "Promo tidak dapat digunakan untuk product yang dipilih",
                variant: "destructive",
            });
            return;
        }
        setSelectedPromo(undefined);
        onPromoSelected(undefined);
    };

    return (
        <div className="space-y-3">
            <div className="mt-2 flex space-x-2 items-center">
                <Input
                    placeholder="Punya Kode Promo? Masukan di sini"
                    value={hiddenPromoCode}
                    onChange={(e) => setHiddenPromoCode(e.target.value)}
                />
                <Button disabled={loading} size="sm" onClick={getHiddenPromo}>
                    {loading ? "Loading..." : "Get Promo"}
                </Button>
            </div>
            {hiddenPromo && (
                <PromoCard
                    promo={hiddenPromo}
                    selected={selectedPromo}
                    setSelected={(e) => selectPromo(true, e)}
                    isSecret
                />
            )}
            {productPromos.map((i) => (
                <PromoCard
                    key={i.code}
                    promo={i}
                    selected={selectedPromo}
                    setSelected={(e) => selectPromo(false, e)}
                />
            ))}
            {promos.map((i) => (
                <PromoCard
                    key={i.code}
                    promo={i}
                    selected={selectedPromo}
                    setSelected={(e) => selectPromo(false, e)}
                />
            ))}
        </div>
    );
}

export default Promo;
