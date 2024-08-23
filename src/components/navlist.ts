import { WalletIcon } from "@heroicons/react/24/outline";
import { HomeIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type path = {
  icon:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, "ref"> & {
          title?: string;
          titleId?: string;
        } & RefAttributes<SVGSVGElement>
      >;
  name: string;
  path: string;
  isAuth?: boolean;
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
    name: "Cek Pesanan",
  },
  {
    path: "/saldo",
    icon: WalletIcon,
    name: "Saldo Point",
    isAuth: true,
  },
  {
    path: "/profile",
    icon: PersonIcon,
    name: "Profil",
  },
];
