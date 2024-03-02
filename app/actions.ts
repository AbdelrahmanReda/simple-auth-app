"use server";
import { cookies } from "next/headers";

export async function removeCookie() {
  cookies().delete("connect.sid");
  cookies().delete("myCustomCookie");
}

export async function fetchCookie() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cookie-alternative`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  cookies().set({
    name: "name",
    value: "lee",
    httpOnly: true,
    path: "/",
  });
  console.log(response.headers.get("set-cookie"));
}
