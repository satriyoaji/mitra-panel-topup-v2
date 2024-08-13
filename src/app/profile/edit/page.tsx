"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/custom-input";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Page() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>(session?.profile?.name ?? "");
  const [name, setName] = useState<string>(session?.profile?.email ?? "");
  const [phone, setPhone] = useState<string>(session?.profile?.phone ?? "");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    if (status && session) {
      setEmail(session.profile.email);
      setName(session.profile.name);
      setPhone(session.profile.phone);
    }
  }, [status]);

  const submitPassword = async () => {
    if (newPassword.length < 6) {
      return toast({
        title: "Error",
        description: "Password minimal 6 digit",
        variant: "destructive",
      });
    }

    if (newPassword != newConfirmPassword) {
      return toast({
        title: "Error",
        description: "Konfirmasi password harus sesuai dengan password baru",
        variant: "destructive",
      });
    }

    const response = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({
        password,
        newPassword,
      }),
    });

    if (!response.ok) {
      const res = await response.json();
      toast({
        title: "Failed",
        description: res.remark,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    });

    if (!response.ok) {
      const res = await response.json();
      return toast({
        title: "Failed",
        description: res.remark,
        variant: "destructive",
      });
    }

    var res = await submitPassword();

    if (res)
      return toast({
        title: "Success",
        description: "Update profile success",
        variant: "success",
      });
  };

  return (
    <div className="flex justify-center w-full px-2">
      <div className="max-w-6xl w-full my-4 flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-4xl w-full space-y-4">
          <div className="bg-background rounded-lg pt-4 px-6 pb-8 w-full sticky top-12">
            <h3 className="font-semibold text-primary">Edit Profile</h3>
            <div className="h-full w-full my-4 space-y-3">
              <h6 className="text-primary">Informasi Akun</h6>
              <div className="w-full space-y-1">
                <Label htmlFor="invoice">Nama</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoFocus={false}
                  placeholder="Masukan Nama"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="w-full space-y-1">
                <Label htmlFor="invoice">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoFocus={false}
                  placeholder="Masukan Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="w-full space-y-1">
                <Label htmlFor="invoice">No. Whatsapp</Label>
                <PhoneInput
                  onValueChange={(e) => {
                    setPhone(`${e}`);
                  }}
                  autoFocus={false}
                  value={phone}
                  placeholder="Masukan No. Whatsapp"
                />
              </div>
            </div>
            <Separator className="w-full my-4" />
            <div className="h-full w-full my-4 space-y-3">
              <h6 className="text-primary">Ubah Keamanan Akun</h6>
              <div className="w-full space-y-1">
                <Label htmlFor="invoice">Ketik Sandi Lama</Label>
                <Input
                  id="old-password"
                  name="old-password"
                  type="password"
                  autoFocus={false}
                  placeholder="Tulis Sandi"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="w-full space-y-1">
                <Label htmlFor="invoice">Ketik Sandi Baru</Label>
                <Input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoFocus={false}
                  placeholder="Minimum 6 Digit Sandi"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
              <div className="w-full space-y-1">
                <Label htmlFor="invoice">Ketik Ulang Sandi Baru</Label>
                <Input
                  id="new-confirm-password"
                  name="new-confirm-password"
                  type="password"
                  autoFocus={false}
                  placeholder="Minimum 6 Digit Sandi"
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  value={newConfirmPassword}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="mt-2 inline-flex justify-end items-end"
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
