"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
        <div className="mb-12">
            <Card className="w-full h-full min-w-fit">
                <CardContent className="p-0 pb-4">
                    <img
                        alt="Remy Sharp"
                        src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt674314efe488e9a4/64b13f0acc7487ee6e3bea1c/fc24.jpg?auto=webp&format=pjpg&width=3840&quality=60"
                        style={{ aspectRatio: 42 / 9 }}
                        className={`relative object-cover rounded-t-xl`}
                    />
                    <div className="px-6">
                        <div className="flex -mt-6 z-40 absolute items-end">
                            <img
                                alt="Remy Sharp"
                                className="rounded  border bg-card text-card-foreground shadow w-20"
                                src="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
                            />
                            <div className="flex flex-col ml-3">
                                <h5 className="font-bold">FIFA 24</h5>
                                <h6 className="text-xs">Games</h6>
                            </div>
                        </div>
                        <p className="text-sm pt-[72px]">
                            Here are all the available border color logical
                            property utilities and their physical property
                            equivalents in both LTR and RTL modes.
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
                    <div className="grid sm:grid-cols-3 xs:grid-cols-4 gap-2">
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
                                <p>Transfer VA</p>
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
                <div className="sticky bottom-12 w-full h-16 rounded-xl bg-black flex items-center justify-between px-4">
                    <div>
                        <h4 className="text-white text-sm">
                            Transfer + 10.000 Point
                        </h4>
                    </div>
                    <div className="flex items-center">
                        <h4 className="text-white text-xl font-bold">
                            Rp. 20.000
                        </h4>
                        <Button className="ml-3" variant="secondary">
                            Purchase
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
