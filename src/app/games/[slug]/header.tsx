import { IProductCategory } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { CubeIcon } from "@radix-ui/react-icons";
import React from "react";
import Description from "./collapsible-description";
import Image from "next/image";

function Header({ category }: { category: IProductCategory }) {
  return (
    <Card className="w-full mt-2 h-full min-w-fit mb-3 ">
      <CardContent className="p-0 md:mb-0 mb-6">
        {category.banner_url && (
          <div
            className="w-full md:px-4 md:pt-4 overflow-clip md:overflow-visible rounded-t-xl"
            style={{ aspectRatio: 16 / 5 }}
          >
            <Image
              width={900}
              height={300}
              alt={category.name}
              src={category?.banner_url ?? "/assets/hero-games.svg"}
              style={{ aspectRatio: 16 / 5 }}
              className={`object-cover w-full md:rounded-xl rounded-t-xl border`}
            />
            {/* <Image
            fill
            alt={category.name}
            src={"/assets/hero-games.svg"}
            style={{ aspectRatio: 64 / 9 }}
            className={`relative object-cover w-full rounded-t-xl`}
            /> */}
          </div>
        )}
        <div className="px-6 pt-4 pb-4">
          <div className="flex z-10 gap-4">
            <div className="rounded flex items-end md:items-start justify-center w-fit absolute md:relative ml-2 -mt-8 md:mt-0 md:ml-0">
              <div>
                <Image
                  width={300}
                  height={300}
                  alt={category.name}
                  className="h-12 w-auto md:h-16 aspect-square rounded-lg border"
                  src={
                    category.image_url ??
                    "https://s3-alpha-sig.figma.com/img/933a/09a5/c2747dd0ee221420e9c6686f29720965?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K3KMtkf5K~~yfNXa2ea9tssgpbLWFv1iMb8SsvtvV3ge91j3ZZW4AmC0xllLpF4amUV-ynFUhLL-V67bEY1ZVqHfVomDFdxW920v8ewfTclN1ZVIp1u2LgV1AmDbyh~SvyFud9HrNh1H5tP-9Rnm-RKir5IS8mJaSDzNi20CeDaossF7AONxvkwNQnZCunulKYElAo133CzmYW~VeNY4WiGIAdMo-pHrAPdXLKSJ9k56scwyeUVy6gVXPe6ePXg3UnqsojH6T43JeQL2qB0O-vU~Fgmbf60Ybt-lz-DzJe21vr2RXgC8Hmb0M8n53D5~gIndUD7CSa~Cjcakv5Cduw__"
                  }
                />
              </div>
              <h4 className="text-lg font-bold ml-2 text-primary p-0 md:hidden">
                {category.name}
              </h4>
            </div>
            <div className="mt-6 md:mt-0 w-full hidden md:block">
              <Description description={category?.description} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
