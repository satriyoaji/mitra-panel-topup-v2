import { Badge } from "@/components/ui/badge";
import { IProductCategory } from "@/Type";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const max = 4;
  const min = 1;
  var num = Math.floor(Math.random() * (max - min + 1) + min);
  let searchParams = new URLSearchParams({
    page: `${num}`,
    limit: "10",
  });

  var res = await fetch(`/api/products/categories?` + searchParams);

  if (res.ok) {
    var result = await res.json();
    return result.data;
  }

  return [];
};

async function InternalLink() {
  const data: IProductCategory[] = await getData();
  return (
    <div>
      <h2 className="font-medium text-xl ml-2 text-muted-foreground">
        Produk Lainnya
      </h2>
      <div className="flex-wrap flex gap-2">
        {data.map((item, i) => (
          <Link href={`/games/${item.key}`}>
            <Badge variant="ghost" className="mr-1">
              {item.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InternalLink;
