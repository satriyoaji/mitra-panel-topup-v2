"use server";
import { cookies } from "next/headers";

export const GetCookie = (key: string) => {
  return cookies().get(key)?.value ?? "";
};

export const SetCookie = (key: string, val: string) => {
  cookies().set(key, val, {
    maxAge: 3600,
    httpOnly: true,
    path: "/",
  });
};
