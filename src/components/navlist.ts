import { HomeIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

export type path = {
    icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
    >;
    name: string;
    path: string;
};

export const paths: path[] = [
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
