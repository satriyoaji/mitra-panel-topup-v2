"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Fragment, useEffect, useRef, useState } from "react";
import { nPlainFormatter, priceMask, uniqeProduct } from "@/Helpers";
import { useSession } from "next-auth/react";
import { IProductCategory, TProduct } from "@/Type";
import Loading from "@/app/loading";
import Header from "./header";
import ProductList from "./product-list";
import Promo from "./promo";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";

function Page({ params }: { params: { slug: string } }) {
    const [productSelected, setProductSelected] = useState<TProduct>();
    const [product, setProduct] = useState<TProduct[]>([]);
    const [category, setCategory] = useState<IProductCategory | null>();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const searchParams = useSearchParams();

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

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <Loading />;

    if (category === null) return <NotFound />;
    else if (category !== null && category !== undefined)
        return (
            <Fragment>
                <Header category={category} />
                <Card className="w-full my-4">
                    <CardContent>
                        <div className="flex mt-3">
                            <h4>
                                <span className="text-xl font-bold">1.</span>{" "}
                                Data Akun
                            </h4>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="id">ID Game *</Label>
                                <Input id="id" placeholder="Masukan ID Game" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="server">ID Server *</Label>
                                <Input
                                    id="server"
                                    placeholder="Masukan ID Server"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                            <h4>
                                <span className="text-xl font-bold">3.</span>{" "}
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
                            <h4>
                                <span className="text-xl font-bold">4.</span>{" "}
                                Promo
                            </h4>
                        </div>
                        <Separator className="my-3" />
                        <Promo
                            listProductId={product.map((i) => i.uuid)}
                            category_uuid={params.slug}
                            product_id={productSelected?.uuid}
                        />
                    </CardContent>
                </Card>
                {!session && (
                    <Card className="w-full my-4" ref={profileRef}>
                        <CardContent>
                            <div className="flex mt-3">
                                <h4>
                                    <span className="text-xl font-bold">
                                        5.
                                    </span>{" "}
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
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="whatsapp">
                                            No. Whatsapp *
                                        </Label>
                                        <Input
                                            id="whatsapp"
                                            type="tel"
                                            placeholder="Masukan No. Whatasapp"
                                            maxLength={13}
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}
                {productSelected && (
                    <div className="sticky bottom-0 w-full pb-1 pt-1.5 rounded-sm bg-black flex items-center justify-between px-4">
                        <div>
                            <h4 className="text-white text-xs">
                                Transfer + 10.000 Point
                            </h4>
                            <h4 className="text-white text-lg font-bold">
                                {priceMask(productSelected.sale_price)}
                            </h4>
                        </div>
                        <div className="">
                            <Button
                                className="ml-3"
                                size="sm"
                                variant="secondary"
                            >
                                Purchase
                            </Button>
                        </div>
                    </div>
                )}
            </Fragment>
        );
}

export default Page;
