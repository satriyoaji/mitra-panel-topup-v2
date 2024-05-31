"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    var res = await signIn("credentials", {
      username,
      password,
      callbackUrl: searchParams.get("callback") || "/",
    });
  };

  return (
    <div className="relative h-[86vh] flex items-center justify-center w-full px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="flex space-y-2 justify-center items-center w-full">
          <div className="w-full md:flex justify-center hidden">
            <Image
              src={"/illustration/DrawKit Larry Character Illustration (8).svg"}
              alt="dw"
              width={220}
              height={220}
            />
          </div>
          <div className="w-full flex justify-center md:justify-start">
            <div className="border p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="pt-4 text-2xl font-semibold tracking-tight">
                🔐Login
              </h1>
              <form
                onSubmit={onSubmit}
                className="w-full max-w-md grid gap-2 pt-4"
              >
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="username" className="text-left">
                    Email
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="email"
                    placeholder="Masukan Email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="passwor" className="text-left">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Masukan Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="flex items-center justify-center">
                    <p className="text-xs">Belum Punya Akun? </p>
                    <Link href="/auth/register">
                      <Button variant="link" size="sm" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
