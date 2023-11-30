'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signOut } from "next-auth/react";
import React from "react";

function page() {
    return (
        <div className="xs:m-4 sm:m-8">
            <Card
                style={{ aspectRatio: 16 / 9 }}
                className="w-full min-w-fit card-profile text-white"
            >
                <CardContent className="flex p-8 flex-col justify-between h-full">
                    <div className="flex flex-row justify-between">
                        <div>
                            <h5 className="font-bold text-2xl">Fulan</h5>
                            <h6 className="">fulan@gmail.com</h6>
                        </div>
                        <Avatar>
                            <AvatarImage
                                src="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
                                alt="dawwa"
                            />
                            <AvatarFallback>Fulan</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <p className="text-xs">Saldo Points</p>
                        <p className="text-xl font-bold">20.000 Points</p>
                    </div>
                </CardContent>
            </Card>
            <Button className="w-full my-4" onClick={() => signOut()}>Sign Out</Button>
        </div>
    );
}

export default page;
