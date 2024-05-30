import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import cryptojs from "crypto-js";

export const config = {
  matcher: ["/profile", "/redeem-coupon/:path*", "/api/:path*"],
};

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const secret = process.env.MITRA_SECRET as string;
    const mitraid = process.env.MITRA_ID as string;
    var timestamp = Date.now();
    var params = mitraid + timestamp;
    var hmac = cryptojs.HmacSHA512(params, secret).toString();
    var sign = cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(hmac));

    var res = NextResponse.next();
    res.headers.set("X-Sign", sign);
    res.headers.set("X-User-Id", mitraid);
    res.headers.set("X-Timestamp", timestamp.toString());
    res.headers.set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNDZlM2VhZi02Mzg5LTRjMzYtODNhMC1lMDY1MjYxYTY4M2EiLCJleHAiOjE3MTg1MjEwODAsImlhdCI6MTcxNTkyOTA4MCwianRpIjoiZjJlYTY5YzYtNTcyZi00ZmY3LTkyNDYtNjA1YzBlZDdjOTJlIiwiaWQiOiJlNDZlM2VhZi02Mzg5LTRjMzYtODNhMC1lMDY1MjYxYTY4M2EifQ.DH9x0I_Y3-muXwNClDIEokaTtdKANO31efF9FvyLbfE"
    );

    return res;
  }

  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    const callbackUrl = `?callback=${req.nextUrl.pathname}` ?? "";
    return NextResponse.redirect(new URL(`/auth/login${callbackUrl}`, req.url));
  }

  if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
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
