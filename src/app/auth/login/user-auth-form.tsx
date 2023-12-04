"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Button
                variant="outline"
                type="button"
                onClick={() => signIn("google")}
                disabled={isLoading}
            >
                {isLoading ? (
                    "Loading..."
                ) : (
                    <Image
                        src="/google.svg"
                        alt="google"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                )}{" "}
                Google
            </Button>
        </div>
    );
}
