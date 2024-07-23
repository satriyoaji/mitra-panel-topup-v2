"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import Image from "next/image";
import { ISiteProfile } from "@/types/utils";
import Searchbar from "@/app/dashboard/searchbar";
import HelpButton from "../help-button";

export type path = {
  name: string;
  path: string;
};

const paths: path[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Transaksi",
    path: "/transaksi",
  },
];

function HeaderV2() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ISiteProfile>();
  const { dispatch, data } = useContext(ThemeContext) as IThemeContext;

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
        <div className="md:hidden w-full"></div>
        <div className="flex md:w-fit w-full justify-center md:justify-start">
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
          <HelpButton />
        </div>
      </div>
    </header>
  );
}

export default HeaderV2;
