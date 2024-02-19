"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { nPlainFormatter, priceMask, uniqeProduct } from "@/Helpers";
import { useSession } from "next-auth/react";
import { IAccount, IProductCategory, IPromo, TProduct } from "@/Type";
import Loading from "@/app/loading";
import Header from "./header";
import ProductList from "./product-list";
import Promo from "./promo";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import { Purchase } from "./detail";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FormAccount from "./form-account";
import { PhoneInput } from "@/components/ui/custom-input";

function Page({ params }: { params: { slug: string } }) {
    const [productSelected, setProductSelected] = useState<TProduct>();
    const [product, setProduct] = useState<TProduct[]>([]);
    const [category, setCategory] = useState<IProductCategory | null>();
    const [promo, setPromo] = useState<IPromo>();
    const [loading, setLoading] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [account, setAccount] = useState<IAccount>({
        email: session?.user?.email ?? "",
        noWhatsapp: session?.phone ?? "",
    });
    const { toast } = useToast();

    const productListRef = useRef<HTMLDivElement>(null);
    const methodRef = useRef<HTMLDivElement>(null);
    const couponRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const getData = async () => {
        setLoading(true);
        var res = await fetch(`/api/products/categories/${params.slug}?`);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                setCategory(result.data);
                setProduct(uniqeProduct(result.data.products));

                var flashSaleItem = searchParams.get("fs");
                setProductSelected(
                    result.data.products.find(
                        (i: TProduct) => i.uuid == flashSaleItem
                    )
                );
            }
        } else setCategory(null);

        setLoading(false);
    };

    const checkout = () => {
        if (!session) {
            if (account && account.email && account.email)
                return setIsCheckoutOpen(true);

            setIsCheckoutOpen(false);
            return toast({
                title: "Failed",
                description: "Email dan whatsapp harus terisi",
                variant: "destructive",
            });
        }

        return setIsCheckoutOpen(true);
    };

    const getTotalPrice: string = useMemo(() => {
        let num = 0;

        if (productSelected) {
            num += productSelected.sale_price;
            if (productSelected.flash_sales)
                num -= productSelected.flash_sales[0].discount_price;
            if (promo) {
                if (promo.promo_type == "fix") num -= promo.promo_value;
                else
                    num -=
                        (promo.promo_value * productSelected.sale_price) / 100;
            }
        }

        return priceMask(num);
    }, [productSelected, promo]);

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <Loading />;

    if (category === null) return <NotFound />;
    else if (category !== null && category !== undefined)
        return (
            <Fragment>
                <Header category={category} />
                {category.forms && (
                    <Card className="w-full my-4">
                        <CardContent className="mt-3">
                            <FormAccount forms={category.forms} />
                        </CardContent>
                    </Card>
                )}
                <div ref={productListRef}>
                    <ProductList
                        category={category.alias}
                        nextRef={methodRef}
                        onProductSelect={(val) => setProductSelected(val)}
                        products={product}
                        productSelected={productSelected}
                    />
                </div>
                <Card className="w-full my-4" ref={methodRef}>
                    <CardContent>
                        <div className="flex mt-3">
                            <h4 className="font-semibold ml-1">
                                Metode Pembayaran
                            </h4>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex items-center space-x-4 text-sm justify-center">
                            <div className="w-full border-4 border-black rounded-lg">
                                <div className="flex justify-center items-center h-full p-3">
                                    <p className="font-semibold">Transfer VA</p>
                                </div>
                            </div>
                            <PlusIcon className="h-8 w-8" />
                            <div className="w-full border-4 border-black rounded-lg">
                                <div className="flex justify-center items-center h-full p-3">
                                    <p className="font-semibold">
                                        {nPlainFormatter(10_000)} Points
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full my-4" ref={couponRef}>
                    <CardContent>
                        <div className="flex mt-3">
                            <h4 className="font-semibold ml-1">Promo</h4>
                        </div>
                        <Separator className="my-3" />
                        <Promo
                            onPromoSelected={setPromo}
                            listProductId={product.map((i) => i.uuid)}
                            categoryUuid={params.slug}
                            productUuid={productSelected?.uuid}
                        />
                    </CardContent>
                </Card>
                {!session && (
                    <Card className="w-full my-4" ref={profileRef}>
                        <CardContent>
                            <div className="flex mt-3">
                                <h4 className="font-semibold ml-1">
                                    Data Konfirmasi
                                </h4>
                            </div>
                            <Separator className="my-3" />
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Masukan alamat Email"
                                            value={account?.email}
                                            onChange={(e) =>
                                                setAccount((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="whatsapp">
                                            No. Whatsapp *
                                        </Label>
                                        <PhoneInput
                                            id="whatsapp"
                                            placeholder="Masukan No. Whatasapp"
                                            maxLength={13}
                                            value={account?.noWhatsapp}
                                            onChange={(e) =>
                                                setAccount((prev) => ({
                                                    ...prev,
                                                    noWhatsapp: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}
                {productSelected && (
                    <>
                        <div className="sticky bottom-0 w-full pb-1 pt-1.5 rounded-sm bg-black flex items-center justify-between px-4">
                            <div>
                                <h4 className="text-white text-xs">
                                    Transfer + 10.000 Point
                                </h4>
                                <h4 className="text-white text-lg font-bold">
                                    {getTotalPrice}
                                </h4>
                            </div>
                            <div className="">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={checkout}
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                        <Purchase
                            onOpenChange={setIsCheckoutOpen}
                            isOpen={isCheckoutOpen}
                            category={category.alias}
                            product={productSelected}
                            promo={promo}
                        />
                    </>
                )}
            </Fragment>
        );
}

export default Page;
