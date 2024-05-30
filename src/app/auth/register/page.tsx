import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function page() {
  const session = await getServerSession(options);

  if (session) return redirect("/");

  return (
    <div className="relative h-[86vh] flex items-center justify-center w-full px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="flex space-y-2 justify-center items-center w-full">
          <div className="w-full flex justify-center">
            <Image
              src={"/illustration/DrawKit Larry Character Illustration (8).svg"}
              alt="dw"
              width={220}
              height={220}
            />
          </div>
          <div className="w-full">
            <div className="border p-8 rounded-lg shadow-md w-full max-w-md">
              <h1 className="pt-4 text-2xl font-semibold tracking-tight">
                🔐Register
              </h1>
              <div className="w-full max-w-md grid gap-2 pt-4">
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="nama" className="text-left">
                    Nama
                  </Label>
                  <Input id="nama" placeholder="Masukan nama" />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="email" className="text-left">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Masukan Email" />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="password" className="text-left">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukan Password"
                  />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="Whatsapp" className="text-left">
                    No. Whatsapp
                  </Label>
                  <Input
                    id="Whatsapp"
                    type="tel"
                    placeholder="Masukan No. Whatsapp"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <Button className="w-full">Register</Button>
                  <div className="flex items-center justify-center">
                    <p className="text-xs">Sudah Punya Akun? </p>
                    <Link href="/auth/login">
                      <Button variant="link" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
