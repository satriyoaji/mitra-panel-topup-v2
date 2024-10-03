import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var url = headers().get("x-url") ?? "";
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  return {
    manifest: "/api/manifest.json",
    title: `Beli Voucher & Top Up Game Murah di ${name}`,
    description: `Temukan semua kebutuhan digital kamu di ${name}, mulai dari beli voucher/top up game, pulsa, platform streaming, dan lainnya!`,
    keywords: keywords,
    openGraph: {
      images: [logo_url],
      title: `Beli Voucher & Top Up Game Murah di ${name}`,
      url,
      type: "website",
    },
    icons: {
      icon: logo_url,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
