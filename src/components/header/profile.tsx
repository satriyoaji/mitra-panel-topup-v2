"use client";

import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";

function Profile({
  onEditClick,
  onLogoutClick,
}: {
  onEditClick?: () => void;
  onLogoutClick?: () => void;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-2 px-3">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Name</p>
            {status === "loading" ? (
              <Skeleton className="h-5 w-full rounded" />
            ) : (
              <>
                <p className="text-sm">{session?.profile.name}</p>
              </>
            )}
          </div>
          <Badge>{session?.profile.tier_name}</Badge>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">Email</p>
          {status === "loading" ? (
            <Skeleton className="h-5 w-full rounded" />
          ) : (
            <p className="text-sm">{session?.profile.email}</p>
          )}
        </div>
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">No. Ponsel</p>
          {status === "loading" ? (
            <Skeleton className="h-5 w-full rounded" />
          ) : (
            <p className="text-sm">{session?.profile.phone}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="space-x-2"
          onClick={() => {
            if (onEditClick) onEditClick();
            router.push("/profile/edit");
          }}
        >
          <PersonIcon />
          <div>Profile</div>
        </Button>
        <Button
          size="sm"
          className="space-x-2 w-full"
          onClick={async () => {
            if (onLogoutClick) onLogoutClick();
            await signOut();
          }}
        >
          <ExitIcon />
          <div>Logout</div>
        </Button>
      </div>
    </div>
  );
}

export default Profile;
