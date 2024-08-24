import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/transaksi/", "/profile/", "/saldo/"],
    },
    sitemap: "/sitemap.xml",
  };
}
