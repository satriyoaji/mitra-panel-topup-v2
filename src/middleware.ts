import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { GetCredHeader } from "./app/api/api-utils";

export const config = {
  matcher: ["/profile", "/auth/:path*", "/redeem-coupon/:path*", "/api/:path*"],
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

  if (!token) {
    const callbackUrl = `?callback=${req.nextUrl.pathname}` ?? "";
    return NextResponse.redirect(new URL(`/auth/login${callbackUrl}`, req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/auth/login`,
      newUser: "/auth/register",
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
