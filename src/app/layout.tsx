import RootTemplateLayout from "./root-layout";
import ThemeWrapper from "./theme-wrapper";
import TemplateLayout from "./template-layout";
import { Metadata } from "next";
import { GetCredHeader } from "./api/api-utils";
import { ISiteProfile } from "@/types/utils";

export async function generateMetadata(): Promise<Metadata> {
    var credentialHeader = GetCredHeader();

    // fetch data
    const res = await fetch(`${process.env.API}/site-profile`, {
        headers: {
            "Content-Type": "application/json",
            "X-Sign": credentialHeader.sign,
            "X-User-Id": credentialHeader.mitraid,
            "X-Timestamp": credentialHeader.timestamp.toString(),
        },
    });

    if (res.ok) {
        var data = await res.json();
        var setting: ISiteProfile = data.data;
        // optionally access and extend (rather than replace) parent metadata
        return {
            manifest: "/api/manifest.json",
            title: setting.title,
            description: setting.description,
            keywords: setting.keywords,
            openGraph: {
                images: [setting.logo_url],
            },
            icons: {
                icon: setting.logo_url,
            },
        };
    }

    return {};
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <RootTemplateLayout>
                <ThemeWrapper>
                    <TemplateLayout>{children}</TemplateLayout>
                </ThemeWrapper>
            </RootTemplateLayout>
        </html>
    );
}
