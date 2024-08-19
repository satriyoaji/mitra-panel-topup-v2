"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function FormResetPassword({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    console.log("ID: ", params.id);
  }, []);

  const onSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative h-full md:pt-12 flex md:items-center justify-center w-full px-0 bg-background md:bg-transparent">
      <div className="md:border p-8 md:rounded-xl md:shadow-md w-full max-w-md md:bg-background">
        <h1 className="pt-4 text-2xl text-center font-semibold tracking-tight">
          🔐Reset Password
        </h1>
        <form
          className="w-full max-w-md grid gap-2 pt-4"
          onSubmit={onSubmitReset}
        >
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="password" className="text-left">
              New Password
            </Label>
            <Input
              className="bg-background"
              id="password"
              type="password"
              placeholder="Masukan New Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="confirmPassword" className="text-left">
              Confirmation Password
            </Label>
            <Input
              className="bg-background"
              id="confirmPassword"
              type="password"
              placeholder="Masukan New Password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
  );
}

export default FormResetPassword;
