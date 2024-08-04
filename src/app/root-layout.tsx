import "./globals.css";
import ThemeProvider from "@/infrastructures/context/theme/theme.provider";
import { NextAuthProvider } from "./_app";
import { SetCookie } from "@/infrastructures/cookieStore";

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
