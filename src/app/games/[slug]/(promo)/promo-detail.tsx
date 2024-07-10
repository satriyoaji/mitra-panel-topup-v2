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
import React, { useEffect, useState } from "react";

function PromoDetail({
  id,
  open,
  onOpenChange,
}: {
  id?: string;
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const [promo, setPromo] = useState<IPromoDetail | undefined>(undefined);

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
    } else {
      setPromo(undefined);
    }
  }, [id]);

  if (id)
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Promo</DialogTitle>
            <DialogDescription>Pilih promo .</DialogDescription>
          </DialogHeader>
          <div className="space-y-3"></div>
        </DialogContent>
      </Dialog>
    );
  return null;
}

export default PromoDetail;
