"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ExitIcon, Pencil1Icon, ReaderIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import DetailProfile from "./detail-profile";
import SaldoPointHistory from "./saldopoint-history";
import Profile from "./(tabs)/profile";
import Tier from "@/components/tier";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  }

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
  }


  return (
    <div className="md:flex gap-4 h-full md:mt-4">
      <div className="md:border md:shadow min-w-[22rem] h-full rounded-xl p-2 md:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="my-1">
              <AvatarImage
                src={dataProfile?.name ? dataProfile?.name : session?.profile?.name as string}
                alt={dataProfile?.name ? dataProfile?.name : session?.profile?.name as string}
              />
              <AvatarFallback>
                {dataProfile?.name ? dataProfile?.name.at(0) : session?.profile?.name?.at(0) ?? ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <h5 className="font-bold">{dataProfile?.name ? dataProfile?.name : session?.profile?.name}</h5>
            </div>
          </div>
          <Tier type={dataProfile?.tier_name ? dataProfile?.tier_name : session?.profile?.tier_name ?? "Public"} />
        </div>
        <Separator className="w-full my-2" />
        <div className="mt-6 w-full">
          <SaldoCard balance={dataProfile?.saldo ?? 0} />
        </div>
        <div className="space-y-3 px-3 mt-6 mb-4">
          <Link
            href="/transaksi"
            className="flex space-x-3 items-center text-sm hover:text-theme-primary-500"
          >
            <ReaderIcon className="mr-3" /> Daftar Transaksi
          </Link>
          <p
            onClick={() => signOut()}
            className="flex space-x-3 items-center text-sm cursor-pointer hover:text-theme-primary-500"
          >
            <ExitIcon className="mr-3" /> Logout
          </p>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="ml-4 hidden md:block h-[88vh]"
      />
      <div className="w-full h-full hidden md:block">
        <div className="py-5 px-4">
          <Tabs defaultValue="profile">
            <div className="flex w-full mb-5">
              <div className="w-full">
                <TabsContent value="profile">
                  <div className="flex py-1 justify-start gap-4 items-center">
                    <h5 className="font-semibold">Detail Profile</h5>
                    <Pencil1Icon
                      onClick={() => setProfileOpen(true)}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pastikan profil anda adalah data terbaru
                  </p>
                </TabsContent>
                <TabsContent value="saldo">
                  <h5 className="font-semibold">History Saldo Point</h5>
                </TabsContent>
              </div>
              <TabsList className="flex w-fit">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="saldo">Saldo Points</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="profile">
              <Profile data={dataProfile} />
            </TabsContent>
            <TabsContent value="saldo">
              <SaldoPointHistory />
            </TabsContent>
          </Tabs>
          
          <Dialog onOpenChange={setProfileOpen} open={profileOpen}>
            <DialogContent className="sm:max-w-md">
              <DetailProfile data={dataProfile} onSuccess={() => toggleModalProfile} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Page;
