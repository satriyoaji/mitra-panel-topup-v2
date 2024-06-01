import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { GetCredHeader } from "./app/api/api-utils";

export const config = {
    matcher: ["/profile", "/redeem-coupon/:path*", "/api/:path*"],
};

export default async function middleware(
    req: NextRequest,
    event: NextFetchEvent
) {
    const token = await getToken({ req });

    if (req.nextUrl.pathname.startsWith("/api")) {
        var credentials = GetCredHeader();

        var res = NextResponse.next();
        res.headers.set("X-Sign", credentials.sign);
        res.headers.set("X-User-Id", credentials.mitraid);
        res.headers.set("X-Timestamp", credentials.timestamp.toString());
        res.headers.set("Authorization", `Bearer ${token?.token}`);

        return res;
    }

    const authMiddleware = withAuth({
        pages: {
            signIn: `/auth/login`,
            newUser: "/auth/register",
        },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
}
