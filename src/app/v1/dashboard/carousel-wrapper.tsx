"use client";

import { IBanner } from "@/types/utils";
import Carousel from "./carousel";
import { useEffect, useState } from "react";

const CarouselWrapper = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);

  const getData = async () => {
    var res = await fetch("/api/banners");

    var data = await res.json();
    console.log(data);
    setBanners(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (banners && banners.length > 0) return <Carousel data={banners} />;
};

export default CarouselWrapper;
