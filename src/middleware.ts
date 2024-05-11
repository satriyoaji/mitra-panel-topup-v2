import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/profile", "/redeem-coupon/:path*"],
};

export default async function middleware(
    req: NextRequest,
    event: NextFetchEvent
) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        const callbackUrl = `?callback=${req.nextUrl.pathname}` ?? "";
        return NextResponse.redirect(
            new URL(`/auth/login${callbackUrl}`, req.url)
        );
    }

    if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const authMiddleware = await withAuth({
        pages: {
            signIn: `/auth/login`,
        },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
}
