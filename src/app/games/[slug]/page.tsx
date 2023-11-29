"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Fragment, useState } from "react";
import ProductCard from "./product-card";

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())
//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }

function Page({ params }: { params: { slug: string } }) {
    const [productSelected, setProductSelected] = useState<number | undefined>(
        undefined
    );

    return (
        <Fragment>
            <Card className="w-full mt-2 h-full min-w-fit">
                <CardContent className="p-0 pb-4">
                    <img
                        alt="Remy Sharp"
                        src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt674314efe488e9a4/64b13f0acc7487ee6e3bea1c/fc24.jpg?auto=webp&format=pjpg&width=3840&quality=60"
                        style={{ aspectRatio: 42 / 9 }}
                        className={`relative object-cover rounded-t-xl`}
                    />
                    <div className="px-6">
                        <div className="flex -mt-4 ml-4 z-40 absolute items-end">
                            <img
                                alt="Remy Sharp"
                                className="rounded  border bg-card text-card-foreground shadow w-16"
                                src="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
                            />
                            <div className="flex flex-col ml-3">
                                <h5 className="font-bold">FIFA 24</h5>
                                <h6 className="text-xs">Games</h6>
                            </div>
                        </div>
                        <p className="text-xs pt-[64px] text-muted-foreground leading-5">
                            Here are all the available border color logical
                            property utilities and their physical property
                            equivalents in both LTR and RTL modes. Here are all
                            the available border color logical property
                            utilities and their physical property equivalents in
                            both LTR and RTL modes.
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full my-4">
                <CardContent>
                    <div className="flex mt-3">
                        <h4>
                            <span className="text-xl font-bold">1.</span> Data
                            Akun
                        </h4>
                    </div>
                    <Separator className="my-3" />
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="id">ID Game</Label>
                                <Input id="id" placeholder="Masukan ID Game" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="server">ID Server</Label>
                                <Input
                                    id="server"
                                    placeholder="Masukan ID Server"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-full my-4">
                <CardContent>
                    <div className="flex mt-3">
                        <h4>
                            <span className="text-xl font-bold">2.</span> Produk
                        </h4>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid sm:grid-cols-3 grid-cols-2  gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, idx) => (
                            <ProductCard
                                selected={val === productSelected}
                                onClick={() => setProductSelected(val)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full my-4">
                <CardContent>
                    <div className="flex mt-3">
                        <h4>
                            <span className="text-xl font-bold">3.</span> Metode
                            Pembayaran
                        </h4>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid xs:grid-cols-4 sm:grid-cols-3 items-center space-x-4 text-sm justify-center">
                        <Card className="w-full border-4 border-black">
                            <div className="flex justify-center items-center h-full p-3">
                                <p className="font-semibold">Transfer VA</p>
                            </div>
                        </Card>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full my-4">
                <CardContent>
                    <div className="flex mt-3">
                        <h4>
                            <span className="text-xl font-bold">4.</span> Data
                            Konfirmasi
                        </h4>
                    </div>
                    <Separator className="my-3" />
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Masukan alamat Email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="whatsapp">No. Whatsapp</Label>
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
            {productSelected && (
                <div className="sticky bottom-0 w-full h-16 rounded-xl bg-black flex items-center justify-between px-4">
                    <div>
                        <h4 className="text-white text-sm">
                            Transfer + 10.000 Point
                        </h4>
                        <h4 className="text-white text-xl font-bold">
                            Rp 20.000
                        </h4>
                    </div>
                    <div className="">
                        <Button className="ml-3" variant="secondary">
                            Purchase
                        </Button>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Page;
