"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "./navlist";
import { useSession } from "next-auth/react";

function BottomNav() {
  const path = usePathname();
  const { data: session } = useSession();

  return (
    <div className="block md:hidden fixed bottom-0 h-12 z-10 w-full border-t-2 shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="flex justify-between items-center h-full">
        {paths.map((val) => {
          if ((!session && !val.isAuth) || session) {
            return (
              <Link
                key={val.path}
                href={val.path}
                className={`flex flex-col h-fit items-center w-full hover:text-primary cursor-pointer ${
                  path == val.path && `text-primary`
                }`}
              >
                <val.icon className="w-4 h-4" />
                <p className="text-xs">{val.name}</p>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default BottomNav;
