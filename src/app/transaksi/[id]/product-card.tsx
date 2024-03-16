import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import React from "react";

function ProductCard() {
    return (
        <Card className="bg-slate-50  p-4">
            <div className="text-xs mb-4 flex items-center space-x-4">
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
                <div>
                    <p>INDOSAT</p>
                    <p className="font-semibold">Transfer Pulsa 100.000</p>
                </div>
                {/* <div>
                    <p>{category.alias}</p>
                    <p className="font-semibold">{product.product_name}</p>
                </div> */}
            </div>
            {/* {form && category.forms && (
                <Table>
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
            )} */}
        </Card>
    );
}

export default ProductCard;
