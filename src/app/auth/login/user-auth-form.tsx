"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callback") ?? "/";

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Button
                variant="outline"
                type="button"
                onClick={async () => {
                    setIsLoading(true);
                    await signIn("google", {
                        redirect: false,
                        callbackUrl,
                    });
                    setIsLoading(false);
                }}
                disabled={isLoading}
            >
                {isLoading ? (
                    "Loading..."
                ) : (
                    <>
                        <Image
                            src="/google.svg"
                            alt="google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Google
                    </>
                )}
            </Button>
        </div>
    );
}
