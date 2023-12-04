import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/profile"] };

export default async function middleware(
    req: NextRequest,
    event: NextFetchEvent
) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
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
