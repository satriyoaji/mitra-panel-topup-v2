import { priceMask } from "@/Helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";
import { CaretSortIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function ProductCard() {
    return (
        <>
            <div className="grid gap-4">
                <Card className="bg-slate-50 px-6 pt-8 pb-6">
                    <div className="flex justify-end mb-4">
                        <Badge variant="destructive">Menunggu Pembayaran</Badge>
                    </div>
                    <div className="text-xs mb-4 flex space-x-4">
                        {/* {val.logo_image !== "" ? (
                                            <img
                                                alt="Remy Sharp"
                                                className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                                src={val.logo_image}
                                            />
                                        ) : ( */}
                        <div className="h-fit w-fit p-2">
                            <SketchLogoIcon className="m-auto" />
                        </div>
                        {/* )} */}
                        <div className="space-y-2 w-full items-center">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p>INDOSAT</p>
                                    <p className="font-semibold">
                                        Transfer Pulsa 100.000
                                    </p>
                                </div>
                                <p className="text-base font-bold">
                                    {priceMask(101_000)}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* {form && category.forms && (
                        <div className="mt-6">
                            <p className="text-xs font-semibold">
                                Data Tambahan
                            </p>
                            <Table className="border-y bg-white rounded mt-1">
                                <TableBody className="text-xs">
                                    {Object.keys(form).map((key) => (
                                        <TableRow>
                                            <TableCell>
                                                {category.forms
                                                    ?.find((i) => i.key == key)
                                                    ?.alias.replace(/_/g, " ")}
                                            </TableCell>
                                            <TableCell className="text-right space-y-1">
                                                {form[key]}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )} */}
                    <Collapsible className="mt-6" defaultOpen={false}>
                        <div className="bg-white border px-4 py-2 rounded-sm">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-xs">
                                    Data Tambahan
                                </p>
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                    >
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent>
                                <Separator className="my-2" />
                                <Table>
                                    <TableBody className="text-xs">
                                        <TableRow>
                                            <TableCell>HP</TableCell>
                                            <TableCell className="text-right space-y-1">
                                                08923213123
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                    <Collapsible className="mt-2">
                        <div className="bg-white border px-4 py-2 rounded-sm">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-xs">
                                    Detail Harga
                                </p>
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                    >
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent>
                                <Separator className="my-2" />
                                <Table className="mt-1.5">
                                    <TableBody className="text-xs">
                                        <TableRow>
                                            <TableCell>Harga</TableCell>
                                            <TableCell className="text-right space-y-1">
                                                {/* {flashSale ? (
                                    <>
                                    <div className="flex space-x-2 justify-end">
                                            <p className="text-red-500">
                                                Flash Sale
                                                </p>
                                                <p className="line-through">
                                                {priceMask(product.sale_price)}
                                            </p>
                                        </div>
                                        <p>
                                            {priceMask(
                                                product.sale_price -
                                                flashSale.discount_price
                                                )}
                                                </p>
                                                </>
                                                ) : (
                                                    <>{priceMask(product.sale_price)}</>
                                )} */}
                                                <>
                                                    <div className="flex space-x-2 justify-end">
                                                        <p className="text-red-500">
                                                            Flash Sale
                                                        </p>
                                                        <p className="line-through">
                                                            {priceMask(102_000)}
                                                        </p>
                                                    </div>
                                                    <p>{priceMask(101_500)}</p>
                                                </>
                                            </TableCell>
                                        </TableRow>
                                        {/* {promo && (
                                <TableRow>
                                <TableCell>Promo</TableCell>
                                <TableCell className="text-right text-red-500">
                                {promo.promo_type == "fix"
                                        ? `- ${priceMask(promo.promo_value)}`
                                        : `- ${promo.promo_value}%`}
                                </TableCell>
                                </TableRow>
                            )} */}

                                        <TableRow>
                                            <TableCell>Promo</TableCell>
                                            <TableCell className="text-right text-red-500">
                                                {priceMask(500)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>

                    <div className="flex justify-end mt-4">
                        <Link href={"/redeem-coupon"}>
                            <Button size="sm">Claim Refund</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default ProductCard;
