import { NextRequest } from "next/server";
import cryptojs from "crypto-js";

export const GetAuthHeader = (request: NextRequest): HeadersInit => {
    var auth = request.headers.get("Authorization");

    var headers: HeadersInit = {
        "x-sign": request.headers.get("x-sign") || "",
        "x-timestamp": request.headers.get("x-timestamp") || "",
        "x-user-id": request.headers.get("x-user-id") || "",
        "Content-Type": "application/json",
    };

    if (auth) headers["Authorization"] = auth;

    return headers;
};

export interface ICredentialHeader {
    sign: string;
    mitraid: string;
    timestamp: number;
}

export const GetCredHeader = (): ICredentialHeader => {
    const secret = process.env.MITRA_SECRET as string;
    const mitraid = process.env.MITRA_ID as string;
    var timestamp = Date.now();
    var params = mitraid + timestamp;
    var hmac = cryptojs.HmacSHA512(params, secret).toString();
    var sign = cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(hmac));

    return {
        sign,
        mitraid,
        timestamp,
    };
};
