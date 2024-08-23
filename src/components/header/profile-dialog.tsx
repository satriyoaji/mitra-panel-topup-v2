"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import Profile from "./profile";
import { signOut, useSession } from "next-auth/react";
import { priceMask } from "@/Helpers";
import InfoTooltip from "../info-tooltip";
import { useRouter } from "next/navigation";

function ProfileDialog() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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
        <PopoverContent className="w-80 p-5">
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
          <div className="mt-4">
            <Profile
              onEditClick={() => setOpen(false)}
              onLogoutClick={() => setOpen(false)}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ProfileDialog;
