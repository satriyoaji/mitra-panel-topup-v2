import React from "react";
import { Card } from "./ui/card";
import { PlusIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { getTotalPrice, nPlainFormatter, priceMask } from "@/Helpers";
import { ITransaction } from "@/Type";
import { isWithinInterval, parseISO } from "date-fns";

function TransactionDetail({
  product,
  category,
  promo,
  form,
  bank,
}: ITransaction) {
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
    // if (product.flash_sales && product.flash_sales.length > 0)
    //     flashSale = product.flash_sales[0];

    const total = getTotalPrice(product, promo, bank);
    return (
      <div>
        <div className="grid gap-4 py-4">
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
                <p>{category.name}</p>
                <p className="font-semibold">{product.name}</p>
              </div>
            </div>
            {form && category.forms && (
              <div className="mt-6">
                <p className="text-xs font-semibold">Data Tambahan</p>
                <Table className="border-y bg-white rounded mt-1">
                  <TableBody className="text-xs">
                    {Object.keys(form).map((key) => (
                      <TableRow key={key}>
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
            )}
          </Card>
          <Table>
            <TableBody className="text-xs">
              <TableRow>
                <TableCell>Harga</TableCell>
                <TableCell className="text-right space-y-1">
                  {product.discounted_price > 0 ? (
                    <>
                      <div className="flex space-x-2 justify-end">
                        <p className="text-red-500">Discount</p>
                        <p className="line-through">
                          {priceMask(product.price)}
                        </p>
                      </div>
                      <p>{priceMask(product.discounted_price)}</p>
                    </>
                  ) : (
                    <>{priceMask(product.price)}</>
                  )}
                </TableCell>
              </TableRow>
              {promo && (
                <TableRow>
                  <TableCell>Promo</TableCell>
                  <TableCell className="text-right text-red-500">
                    {promo.promo_type == "fix"
                      ? `- ${priceMask(promo.promo_value)}`
                      : `- ${promo.promo_value}%`}
                  </TableCell>
                </TableRow>
              )}
              {bank && bank.fee_amount ? (
                <TableRow>
                  <TableCell>Admin Fee</TableCell>
                  <TableCell className="text-right">
                    {`+ ${priceMask(bank.fee_amount)}`}
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total Harga</TableCell>
                <TableCell className="text-right">{priceMask(total)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Separator className="my-4" />
        <p>Pembayaran</p>
        <div className="flex items-center w-full gap-4">
          <div className="p-2 w-full h-full rounded-lg border flex flex-col justify-center items-center">
            <p className="font-medium text-xl ml-2">🪙</p>
            <Separator className="my-2" />
            <p className="font-medium text-sm">
              {nPlainFormatter(20_000)} Points
            </p>
          </div>
          {bank && (
            <>
              <PlusIcon className="w-8 h-8" />
              <div className="p-4 w-full h-full rounded-lg border flex flex-col justify-center items-center">
                {bank.image_url ? (
                  <Image
                    alt={bank.name}
                    src={bank.image_url}
                    width={70}
                    height={70}
                  />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-xl -mt-1">💳</p>
                    <p className="font-medium text-xs">{bank.name}</p>
                  </div>
                )}
                <Separator className="my-2" />
                <p className="font-medium text-sm">
                  {priceMask(total - 20_000)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  return <></>;
}

export default TransactionDetail;
