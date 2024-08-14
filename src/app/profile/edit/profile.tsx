"use client";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Profile() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>(session?.profile?.name ?? "");
  const [name, setName] = useState<string>(session?.profile?.email ?? "");
  const [phone, setPhone] = useState<string>(session?.profile?.phone ?? "");
  const { toast } = useToast();

  useEffect(() => {
    if (status && session) {
      setEmail(session.profile.email);
      setName(session.profile.name);
      setPhone(session.profile.phone);
    }
  }, [status]);

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

    return toast({
      title: "Success",
      description: "Update profile success",
      variant: "success",
    });
  };

  return (
    <div>
      <div className="h-full w-full my-4 space-y-3">
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
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="mt-2 inline-flex justify-end items-end"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}

export default Profile;
