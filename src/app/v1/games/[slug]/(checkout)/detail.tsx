import { getTotalPrice, priceMask } from "@/Helpers";
import { ITransaction } from "@/Type";
import TransactionDetail from "@/components/transaction-detail";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { isWithinInterval, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface IDetailProp extends ITransaction {
    isOpen: boolean;
    onOpenChange: (e: boolean) => void;
}

export function Purchase({
    product,
    category,
    promo,
    isOpen,
    onOpenChange,
    form,
    bank,
}: IDetailProp) {
    if (promo) {
        if (
            !isWithinInterval(new Date(), {
                start: parseISO(promo.start_at),
                end: parseISO(promo.finish_at),
            })
        )
            promo = undefined;
    }

    let flashSale;
    if (product && category) {
        if (product.flash_sales && product.flash_sales.length > 0)
            flashSale = product.flash_sales[0];

        const total = getTotalPrice(product, flashSale, promo, bank);

        return (
            <Dialog
                open={isOpen}
                defaultOpen={false}
                onOpenChange={onOpenChange}
            >
                <DialogContent className="max-w-sm w-full">
                    <DialogHeader>
                        <DialogTitle>Detail Pesanan</DialogTitle>
                        <DialogDescription>
                            Cek pesanan anda terlebih dahulu sebelum melanjutkan
                            pembayaran.
                        </DialogDescription>
                    </DialogHeader>
                    <TransactionDetail
                        bank={bank}
                        category={category}
                        form={form}
                        product={product}
                        promo={promo}
                    />
                    <div>
                        <Separator className="mb-2" />
                        <div className="flex justify-between items-center">
                            <div className="text-xs space-y-0.5">
                                <p className="">Total Harga</p>
                                <p className="font-semibold text-sm">
                                    {priceMask(total)}
                                </p>
                            </div>
                            <Link href={"/transaksi/adwdadaw"}>
                                <Button type="submit" size="sm">
                                    Bayar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return <></>;
}
