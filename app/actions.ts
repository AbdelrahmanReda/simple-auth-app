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
  response.headers.getSetCookie().forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookies().set({
      name,
      value,
      httpOnly: true,
      path: "/",
    });
  });

  console.log(response.headers.getSetCookie());
}

export async function login(email: string, password: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
      credentials: "include",
    },
  );
  console.log(response.headers);
  console.log(response.status);
  console.log(response.headers.getSetCookie());
  response.headers.getSetCookie().forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookies().set({
      name,
      value,
      httpOnly: true,
      path: "/",
      domain: "next-auth-app-six-delta.vercel.app",
    });
  });
}
