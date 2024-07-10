import { GetCredHeader } from "@/app/api/api-utils";
import { GetCookie } from "@/infrastructures/cookieStore";
import React from "react";
import FlashSaleV1 from "./v1/flash-sale-v1";
import FlashSaleV2 from "./v2/flash-sale-v2";

const getData = async () => {
  const credentialHeader = GetCredHeader();

  var re = await fetch(`${process.env.API}/flash-sale/products`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
    next: {
      revalidate: 30,
    },
  });

  if (re.ok) {
    var result = await re.json();
    return result.data;
  }

  return undefined;
};

async function FlashSaleWrapper() {
  const data = await getData();
  const version = GetCookie("version");

  if (data) {
    if (version === "1") return <FlashSaleV1 data={data} />;
    else return <FlashSaleV2 data={data} />;
  }
}

export default FlashSaleWrapper;
