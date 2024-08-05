import "./globals.css";
import ThemeProvider from "@/infrastructures/context/theme/theme.provider";
import { NextAuthProvider } from "./_app";

export default function RootTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ThemeProvider>
  );
}
