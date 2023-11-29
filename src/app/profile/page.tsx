import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function page() {
    return (
        <div className="xs:m-4 sm:m-8">
            <Card
                style={{ aspectRatio: 16 / 9 }}
                className="w-full min-w-fit card-profile text-white"
            >
                <CardContent className="flex p-8 flex-col justify-between h-full">
                    <div className="flex flex-row">
                        <Avatar>
                            <AvatarImage
                                src="https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg"
                                alt="dawwa"
                            />
                            <AvatarFallback>Fulan</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <h5 className="font-bold">Fulan</h5>
                            <h6 className="text-xs">Gold</h6>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs">Saldo Points</p>
                        <p className="text-2xl font-bold">20.000 Points</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default page;
