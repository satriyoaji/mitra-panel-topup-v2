import type { Metadata } from "next";
import RootTemplateLayout from "./template-layout";
import ThemeWrapper from "./theme-wrapper";

export const metadata: Metadata = {
  title: "Topup User",
  description: "Topup User Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootTemplateLayout>
      <ThemeWrapper>{children}</ThemeWrapper>
    </RootTemplateLayout>
  );
}
