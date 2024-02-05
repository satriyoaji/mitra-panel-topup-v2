import { TProduct } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { ChangeEvent, RefObject, useEffect, useState } from "react";
import ProductCard from "./product-card";
import { debounce, priceMask } from "@/Helpers";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IdCardIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

interface IProductList {
    products: TProduct[];
    onProductSelect: (val: TProduct) => void;
    productSelected?: TProduct;
    nextRef: RefObject<HTMLDivElement>;
    category: string;
}

interface productType {
    title: React.JSX.Element;
    type: "flash-sale";
}

const typeList: productType[] = [
    {
        title: (
            <>
                <LightningBoltIcon />
                <p>Flash Sale</p>
            </>
        ),
        type: "flash-sale",
    },
];

function ProductList(prop: IProductList) {
    const [search, setSearch] = useState("");
    const [productSearch, setProductSearch] = useState<TProduct[]>([]);
    const [filter, setFilter] = useState<productType>();

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
                <div className="flex w-full overflow-x-auto">
                    {typeList.map((val, idx) => (
                        <Badge
                            className="mx-1 cursor-pointer space-x-2"
                            key={`${idx}`}
                            color="primary"
                            variant={
                                val.type == filter?.type
                                    ? "destructive"
                                    : "outline"
                            }
                            onClick={() => {
                                if (filter == val) setFilter(undefined);
                                else setFilter(val);
                            }}
                        >
                            {val.title}
                        </Badge>
                    ))}
                </div>
                <Input
                    placeholder="Search Product..."
                    onChange={doSearch}
                    className="mb-4 mt-2"
                />
                <div className="grid grid-cols-3 no-scrollbar gap-2">
                    {(search ? productSearch : prop.products).map((val) => {
                        const item = (
                            <ProductCard
                                key={val.uuid}
                                category={prop.category}
                                selected={
                                    val.uuid === prop.productSelected?.uuid
                                }
                                discount={
                                    val.flash_sales
                                        ? priceMask(
                                              val.flash_sales[0].discount_price
                                          )
                                        : undefined
                                }
                                onClick={() => {
                                    prop.onProductSelect(val);
                                    setTimeout(() => {
                                        prop.nextRef.current?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }, 1200);
                                }}
                                discountPrice={
                                    val.flash_sales
                                        ? priceMask(
                                              val.sale_price -
                                                  val.flash_sales[0]
                                                      .discount_price
                                          )
                                        : undefined
                                }
                                name={val.product_name}
                                price={priceMask(val.sale_price)}
                            />
                        );

                        if (filter) {
                            if (filter.type === "flash-sale" && val.flash_sales)
                                return item;
                            return;
                        }

                        return item;
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export default ProductList;
