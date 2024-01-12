import { TProduct } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { ChangeEvent, RefObject, useEffect, useState } from "react";
import ProductCard from "./product-card";
import { debounce, priceMask } from "@/Helpers";

interface IProductList {
    products: TProduct[];
    onProductSelect: (val: TProduct) => void;
    productSelected?: TProduct;
    nextRef: RefObject<HTMLDivElement>;
    category: string;
}

function ProductList(prop: IProductList) {
    const [search, setSearch] = useState("");
    const [productSearch, setProductSearch] = useState<TProduct[]>([]);

    const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 500);

    useEffect(() => {
        const data = prop.products.filter((item) =>
            item.product_name.includes(search)
        );
        setProductSearch(data);
    }, [search]);

    return (
        <Card className="w-full my-4">
            <CardContent>
                <div className="flex mt-3">
                    <h4>
                        <span className="text-xl font-bold">2.</span> Produk
                    </h4>
                </div>
                <Separator className="my-3" />
                <Input
                    placeholder="Search Product..."
                    onChange={doSearch}
                    className="my-4"
                />
                <div className="grid sm:grid-cols-3 grid-cols-2  gap-2">
                    {(search ? productSearch : prop.products).map((val) => (
                        <ProductCard
                            key={val.uuid}
                            category={prop.category}
                            selected={val.uuid === prop.productSelected?.uuid}
                            onClick={() => {
                                prop.onProductSelect(val);
                                setTimeout(() => {
                                    prop.nextRef.current?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }, 1200);
                            }}
                            name={val.product_name}
                            price={priceMask(val.sale_price)}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default ProductList;
