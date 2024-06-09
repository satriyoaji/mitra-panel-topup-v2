import { TFont } from "@/types/utils";
import { Roboto, Nunito_Sans, Montserrat, Yeseva_One } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
});
const yeseva = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
});

const fonts: TFont[] = [
  {
    title: "Roboto",
    class: roboto,
  },
  {
    title: "Nunito Sans",
    class: nunito,
  },
  {
    title: "Montserrat",
    class: montserrat,
  },
  {
    title: "Yeseva One",
    class: yeseva,
  },
];

export { roboto, nunito, montserrat, yeseva, fonts };
