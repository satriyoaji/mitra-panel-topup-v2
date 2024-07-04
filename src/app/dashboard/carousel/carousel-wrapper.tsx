"use client";

import { IBanner } from "@/types/utils";
import { useContext, useEffect, useState } from "react";
import CarouselV1 from "./v1/carousel";
import CarouselV2 from "./v2/carousel";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";

const CarouselWrapper = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const { data } = useContext(ThemeContext) as IThemeContext;

  const getData = async () => {
    var res = await fetch("/api/banners");

    var data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (banners && banners.length > 0) {
    if (data.version == "1") return <CarouselV1 data={banners} />;
    return <CarouselV2 data={banners} />;
  }
};

export default CarouselWrapper;
