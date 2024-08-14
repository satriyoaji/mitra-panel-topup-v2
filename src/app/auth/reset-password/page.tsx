"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

function Page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast({
      title: "Email Reset Sandi Terkirim",
      description:
        "Sistem mengirimkan link reset Sandi ke email, Harap periksa email",
      variant: "success",
    });
    setLoading(false);

    setTimeout(() => {
      window.location.replace("/auth/login");
    }, 5000);
  };

  return (
    <div className="relative min-h-[50vh] flex items-center justify-center w-full px-0 py-28">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6">
        <div className="flex space-y-2 justify-center items-center w-full">
          <div className="w-full md:flex hidden justify-center">
            <Image
              src={
                "/assets/illustration/DrawKit Larry Character Illustration (8).svg"
              }
              alt="dw"
              width={220}
              height={220}
            />
          </div>
          <div className="w-full flex justify-center md:justify-start">
            <div className="border p-8 bg-background rounded-lg shadow-md w-full max-w-md">
              <h1 className="pt-4 text-2xl text-center font-semibold tracking-tight">
                🔐Reset Password
              </h1>
              <form
                className="w-full max-w-md grid gap-2 pt-4"
                onSubmit={onSubmit}
              >
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="email" className="text-left">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukan Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : "Reset"}
                  </Button>
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
