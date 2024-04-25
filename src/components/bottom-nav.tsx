"use client";
import Link from "next/link";
import { HomeIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import ToTopButton from "./totop-button";

type path = {
    icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
    >;
    name: string;
    path: string;
};

const paths: path[] = [
    {
        path: "/",
        icon: HomeIcon,
        name: "Home",
    },
    {
        path: "/transaksi",
        icon: ReaderIcon,
        name: "Transaksi",
    },
    {
        path: "/profile",
        icon: PersonIcon,
        name: "Profile",
    },
];

function BottomNav() {
    const path = usePathname();
    if (path === "/" || path === "/transaksi" || path === "/profile")
        return (
            <div className="fixed bottom-0 h-12 z-50 w-full max-w-xl border-t-2 shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
                <div className="flex justify-between items-center h-full">
                    {paths.map((val) => (
                        <Link
                            key={val.path}
                            href={val.path}
                            className={`flex flex-col h-fit items-center w-full hover:text-theme-primary-500 cursor-pointer ${
                                path == val.path && "text-theme-primary-700"
                            }`}
                        >
                            <val.icon className="w-4 h-4" />
                            <p className="text-xs">{val.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        );
}

export default BottomNav;
