import { IPromo } from "@/Type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import PromoCard from "./promo-card";

function Promo({
    category_uuid,
    product_id,
}: {
    category_uuid: string;
    product_id?: string;
}) {
    const [selectedPromo, setSelectedPromo] = useState<string>();
    const [promos, setPromos] = useState<IPromo[]>([]);
    const [hiddenPromos, setHiddenPromos] = useState<IPromo[]>([]);
    const [productPromos, setProductPromos] = useState<IPromo[]>([]);
    const [hiddenPromo, setHiddenPromo] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const useOtherPromo = async () => {
        await getData(hiddenPromo);
        setHiddenPromo("");
    };

    const getData = async (id?: string) => {
        setLoading(true);
        let qParams = new URLSearchParams();

        if (id) qParams.append("code_search", id);
        else if (product_id) qParams.append("product_uuid", product_id);
        else qParams.append("category_uuid", category_uuid);

        var res = await fetch(`/api/products/promo?` + qParams, {
            method: "PUT",
        });

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (product_id) {
                    setProductPromos(result.data);
                    setLoading(false);
                    return;
                }
                if (id) {
                    setHiddenPromos(result.data);
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
            if (id) {
                setHiddenPromos([]);
                setLoading(false);
                return;
            }

            setPromos([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [product_id]);

    return (
        <div className="space-y-3">
            <div className="mt-2 flex space-x-2 items-center">
                <Input
                    placeholder="Punya Kode Promo? Masukan di sini"
                    value={hiddenPromo}
                    onChange={(e) => setHiddenPromo(e.target.value)}
                />
                <Button disabled={loading} size="sm" onClick={useOtherPromo}>
                    {loading ? "Loading..." : "Get Promo"}
                </Button>
            </div>
            {hiddenPromos.filter((i) => !i.showable).length > 0 &&
                hiddenPromos.map((i) => (
                    <PromoCard
                        promo={i}
                        selected={selectedPromo}
                        setSelected={setSelectedPromo}
                        isSecret
                    />
                ))}
            {productPromos
                .filter((i) => i.showable)
                .map((i) => (
                    <PromoCard
                        promo={i}
                        selected={selectedPromo}
                        setSelected={setSelectedPromo}
                    />
                ))}
            {promos
                .filter((i) => i.showable)
                .map((i) => (
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
