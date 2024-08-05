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
import { Separator } from "../ui/separator";

export type path = {
  name: string;
  path: string;
  isSession: boolean;
};

const paths: path[] = [
  {
    name: "Home",
    path: "/",
    isSession: false,
  },
  {
    name: "Cek Pesanan",
    path: "/transaksi",
    isSession: true,
  },
];

function Header({ profile }: { profile?: ISiteProfile }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [invoice, setInvoice] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(ThemeContext) as IThemeContext;

  useEffect(() => {
    if (profile?.theme_color) {
      dispatch({
        action: "SET_PRIMARY_COLOR",
        payload: profile.theme_color,
      });
    }
  }, []);

  return (
    <header className="w-full flex justify-center z-20 bg-white/90 backdrop-blur-md items-center top-0 sticky p-1">
      <div className="w-full flex container items-center justify-between px-2">
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
                {paths.map(
                  (i) =>
                    ((i.isSession && session) || !i.isSession) && (
                      <NavigationMenuItem
                        className="bg-transparent"
                        key={i.path}
                      >
                        <Link href={i.path} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()}`}
                          >
                            {i.name}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )
                )}
                {!session && (
                  <NavigationMenuItem className="bg-transparent">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        className={navigationMenuTriggerStyle()}
                        onClick={() => setOpen(true)}
                      >
                        Cek Pesanan
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
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Searchbar />
          <Separator
            className="mx-0.5 h-10 md:block hidden"
            orientation="vertical"
          />
          {session ? (
            <div className="my-1 mx-1 hidden md:block">
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

export default Header;
