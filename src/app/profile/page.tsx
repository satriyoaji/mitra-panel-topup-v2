"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DiscIcon, ExitIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Tier from "@/components/tier";
import SaldoCard from "./saldo-card";
import { IProfile } from "@/Type";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";

function Page() {
  const { data: session } = useSession();
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [loading, setLoading] = useState(false);
  const [dataProfile, setDataProfile] = useState<IProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const toggleModalProfile = () => {
    setProfileOpen(false);
    getData();
  };

  const getData = async () => {
    setLoading(true);
    var res = await fetch(`/api/profile`);
    if (res.ok) {
      var result = await res.json();
      if (result.data) {
        dispatch({
          action: "SET_PROFILE",
          payload: result.data,
        });
        setDataProfile(result.data);
      }
    } else
      dispatch({
        action: "SET_PROFILE",
        payload: null,
      });

    setLoading(false);
  };

  return (
    <div className={`flex justify-center w-full`}>
      <div
        className={`space-x-4 h-[92vh] md:pt-4 bg-background w-full container px-2 sm:px-6 grid grid-cols-1 sm:grid-cols-3`}
      >
        <div className="md:border md:shadow w-full h-fit rounded-xl bg-background p-2 md:p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex">
                <Avatar className="my-1">
                  <AvatarImage
                    src={
                      dataProfile?.name
                        ? dataProfile?.name
                        : (session?.profile?.name as string)
                    }
                    alt={
                      dataProfile?.name
                        ? dataProfile?.name
                        : (session?.profile?.name as string)
                    }
                  />
                  <AvatarFallback>
                    {dataProfile?.name
                      ? dataProfile?.name.at(0)
                      : session?.profile?.name?.at(0) ?? ""}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex">
                <h5 className="font-bold">
                  {dataProfile?.name
                    ? dataProfile?.name
                    : session?.profile?.name}
                </h5>
                <Link href="/profile/edit">
                  <Pencil1Icon
                    onClick={() => setProfileOpen(true)}
                    className="cursor-pointer ml-1 mt-1 md:hidden"
                  />
                </Link>
              </div>
            </div>
            <Tier
              type={
                dataProfile?.tier_name
                  ? dataProfile?.tier_name
                  : session?.profile?.tier_name ?? "Public"
              }
            />
          </div>
          <div className="mt-6 w-full">
            <SaldoCard balance={dataProfile?.saldo ?? 0} />
          </div>
          <div className="mt-6 mb-4">
            <Link
              href="/saldo"
              className={`flex px-3 py-2 space-x-3 items-center text-sm hover:bg-zinc-50`}
            >
              <DiscIcon className="mr-3" /> Saldo Point History
            </Link>
            <p
              onClick={() => signOut()}
              className={`flex px-3 space-x-3 py-2 items-center text-sm cursor-pointer hover:bg-zinc-50`}
            >
              <ExitIcon className="mr-3" /> Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
