"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import Image from "next/image";
import { ISiteProfile } from "@/types/utils";
import Searchbar from "@/app/dashboard/searchbar";
import HelpButton from "../help-button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type path = {
  name: string;
  path: string;
};

const paths: path[] = [
  {
    name: "Home",
    path: "/",
  },
];

function HeaderV2() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ISiteProfile>();
  const [invoice, setInvoice] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);

  const getProfile = async () => {
    var res = await fetch("/api/site-profile");
    if (res.ok) {
      var data = await res.json();
      setProfile(data.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <header className="w-full z-20 bg-background backdrop-blur-md items-center top-0 sticky p-1">
      <div className="w-full flex sm:container items-center justify-between">
        <div className="flex md:w-fit w-full justify-start">
          <Link href="/" className="p-1">
            {profile?.logo_url && (
              <Image
                src={profile?.logo_url}
                alt="logo"
                width={40}
                height={40}
              />
            )}
          </Link>
        </div>
        <div className="flex w-full justify-end items-center gap-2">
          <div className="hidden md:flex pl-8">
            <NavigationMenu>
              <NavigationMenuList className="w-fit">
                {paths.map((i) => (
                  <NavigationMenuItem className="bg-transparent" key={i.path}>
                    <Link href={i.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()}`}
                      >
                        {i.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem className="bg-transparent">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger>
                      <NavigationMenuTrigger onClick={() => setOpen(true)}>
                        Cek Pesanan
                      </NavigationMenuTrigger>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <div className="flex p-2 gap-2">
                        <Input
                          className="w-full min-w-[20rem]"
                          placeholder="Masukkan No.Invoice / No.Ponsel"
                          onChange={(e) => setInvoice(e.target.value)}
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            router.refresh();
                            window.location.replace(
                              `/transaksi?search=${invoice}&page=1`
                            );
                          }}
                        >
                          Cek
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Searchbar />
          {session ? (
            <div className="my-1 mx-3 hidden md:block">
              <Avatar
                className="cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <AvatarImage
                  src={session?.profile?.name as string}
                  alt={session?.profile?.name as string}
                />
                <AvatarFallback>
                  {session?.profile?.name?.at(0) ?? ""}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link href="/auth/login" className="m-2 hidden md:block">
              <Button size="sm">Login</Button>
            </Link>
          )}
          <div>
            <HelpButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderV2;
