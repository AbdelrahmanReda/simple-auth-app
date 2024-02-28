"use server";
import { cookies } from "next/headers";

export async function removeCookie() {
  cookies().delete("connect.sid");
  cookies().delete("myCustomCookie");
}
