"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { priceMask } from "@/Helpers";
import InfoTooltip from "../info-tooltip";

function ProfileDialog() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            className="flex space-x-1"
          >
            <PersonIcon />
            <div className="text-xs">Profil</div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 space-y-6 p-5">
          <div className="px-4 py-3 w-full rounded-xl space-y-1 bg-slate-100">
            <div className="flex justify-between items-end">
              <div className="flex space-x-1 text-xs items-center">
                <p className="text-xs text-muted-foreground p-0">
                  Saldo Points
                </p>
                <InfoTooltip className="w-3 h-3 text-muted-foreground">
                  <p className="text-xs">Ini Merupakan Saldo Refund</p>
                </InfoTooltip>
              </div>
              <p
                onClick={() => {
                  setOpen(false);
                  router.push("/saldo");
                }}
                className="cursor-pointer text-xs text-primary hover:underline-offset-2 hover:underline"
              >
                Riwayat Saldo
              </p>
            </div>
            <p className="font-medium">
              {priceMask(session?.profile.saldo ?? 0)}
            </p>
          </div>
          <div className="space-y-2 px-3">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm">{session?.profile.name}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm">{session?.profile.email}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">No. Ponsel</p>
              <p className="text-sm">{session?.profile.phone}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="space-x-2"
              onClick={() => {
                setOpen(false);
                router.push("/profile/edit");
              }}
            >
              <PersonIcon />
              <div>Profile</div>
            </Button>
            <Button
              size="sm"
              className="space-x-2"
              onClick={async () => {
                setOpen(false);
                await signOut();
              }}
            >
              <ExitIcon />
              <div>Logout</div>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ProfileDialog;
