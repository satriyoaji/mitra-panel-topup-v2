import React from "react";
import { UserAuthForm } from "./user-auth-form";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";

async function page() {
    const session = await getServerSession(options);

    if (session) return redirect("/");

    return (
        <div className="container relative h-[86vh] flex-col items-center justify-center grid max-w-none px-0">
            <div className="p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <Image
                            src={
                                "/illustration/DrawKit Larry Character Illustration (8).svg"
                            }
                            alt="dw"
                            width={300}
                            height={300}
                        />
                        <h1 className="text-2xl font-semibold tracking-tight">
                            🔐Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Redirect ke VCGamers Panel Account
                        </p>
                    </div>
                    {/* <UserAuthForm /> */}
                </div>
            </div>
        </div>
    );
}

export default page;
