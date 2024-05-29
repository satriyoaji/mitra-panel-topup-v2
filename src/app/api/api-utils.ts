import { NextRequest } from "next/server";

export const GetAuthHeader = (request: NextRequest): HeadersInit => {
  return {
    "x-sign": request.headers.get("x-sign") || "",
    "x-timestamp": request.headers.get("x-timestamp") || "",
    "x-user-id": request.headers.get("x-user-id") || "",
  };
};
