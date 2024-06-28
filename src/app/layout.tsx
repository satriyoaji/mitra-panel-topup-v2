import RootTemplateLayout from "./template-layout";
import ThemeWrapper from "./theme-wrapper";

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
