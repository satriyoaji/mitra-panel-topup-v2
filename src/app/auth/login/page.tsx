import React from "react";
import { UserAuthForm } from "./user-auth-form";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function page() {
    const session = await getServerSession(options);

    if (session) return redirect("/");

    return (
        <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Masuk dengan akun google anda
                        </p>
                    </div>
                    <UserAuthForm />
                </div>
            </div>
        </div>
    );
}

export default page;
