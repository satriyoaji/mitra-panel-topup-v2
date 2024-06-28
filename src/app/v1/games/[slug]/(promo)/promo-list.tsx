import { TProduct, TProductItem } from "@/Type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import PromoCard from "./promo-card";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { IPromo } from "@/types/transaction";

function Promo({
  categoryUuid,
  product,
  listProductId,
  onPromoSelected,
}: {
  categoryUuid: string;
  product?: TProductItem;
  listProductId: string[];
  onPromoSelected: (promo?: IPromo) => void;
}) {
  const [selectedPromo, setSelectedPromo] = useState<IPromo>();
  const [promos, setPromos] = useState<IPromo[]>([]);
  const [hiddenPromo, setHiddenPromo] = useState<IPromo>();
  const [hiddenPromoCode, setHiddenPromoCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const getData = async (id?: string) => {
    console.log(id, categoryUuid);
    if (!id || !categoryUuid) return;
    setLoading(true);

    let qParams = new URLSearchParams();
    qParams.append("product_key", id);
    qParams.append("category_key", categoryUuid);

    var res = await fetch(`/api/products/promo?` + qParams);

    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        setPromos(result.data);
        setLoading(false);
        return;
      }

      setPromos([]);
    }
    setLoading(false);
  };

  const isDuplicatePromo = (p: IPromo) => {
    const arr: IPromo[] = promos;
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
            listProductId.some((i) => i === result.data.ref_product?.uuid))
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
    getData(product?.key);
    setSelectedPromo(undefined);
    onPromoSelected();
  }, [product, categoryUuid]);

  const selectPromo = (isSecret: boolean, promo?: IPromo) => {
    setSelectedPromo(promo);
    onPromoSelected(promo);
    setOpen(false);
  };

  return (
    <>
      {selectedPromo ? (
        <PromoCard
          selected={selectedPromo}
          promo={selectedPromo}
          setSelected={() => setOpen(true)}
        />
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="rounded-xl cursor-pointer hover:bg-slate-50 py-4 px-6 border-2 flex justify-between items-center border-theme-secondary-500"
        >
          <p className="p-0 m-0">Pilih Promo</p>
          <ChevronRightIcon />
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promo</DialogTitle>
            <DialogDescription>Pilih promo paling cuan.</DialogDescription>
          </DialogHeader>
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
            <div className="space-y-3 max-h-[56vh] overflow-y-auto">
              {hiddenPromo ? (
                <PromoCard
                  promo={hiddenPromo}
                  selected={selectedPromo}
                  setSelected={(e) => selectPromo(true, e)}
                  isSecret
                />
              ) : null}
              {promos.map((i) => (
                <PromoCard
                  key={i.promo_code}
                  promo={i}
                  selected={selectedPromo}
                  setSelected={(e) => selectPromo(true, e)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Promo;
