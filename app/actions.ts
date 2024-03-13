"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function removeCookie() {
  cookies().delete("connect.sid");
  cookies().delete("myCustomCookie");
}

export async function login(email: string, password: string, hostName: string) {
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

  // const serverCookies = response.headers.getSetCookie();
  // // Object to store extracted key-value pairs
  // let extractedCookies = {} as any;
  //
  // // Loop through each cookie string
  // serverCookies.forEach((cookie) => {
  //   // Split the cookie string by semicolon to separate different attributes
  //   const cookieAttributes = cookie.split(";");
  //
  //   // Extract key and value from the first part of the split
  //   const [key, value] = cookieAttributes[0].split("=");
  //
  //   // Store key-value pair in the extractedCookies object
  //   extractedCookies[key] = value;
  // });
  //
  // // Access specific information like id, email, etc.
  // const myCustomCookie = extractedCookies["myCustomCookie"];
  // const testCookieValue = extractedCookies["testCookie"];
  // const sessionId = extractedCookies["connect.sid"];
  //
  // cookies().set({
  //   name: "connect.sid",
  //   value: sessionId,
  //   httpOnly: true,
  //   path: "/",
  // });
  // cookies().set({
  //   name: "myCustomCookie",
  //   value: myCustomCookie,
  //   httpOnly: true,
  //   path: "/",
  // });
  // cookies().set({
  //   name: "testCookie",
  //   value: testCookieValue,
  //   httpOnly: true,
  //   path: "/",
  // });
  //
  // cookies().set({
  //   name: "name",
  //   value: "lee",
  //   httpOnly: true,
  //   path: "/",
  // });
  // redirect("/posts");
  /* response.headers.getSetCookie().forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookies().set({
      name,
      value,
      httpOnly: true,
      path: "/",
      domain: hostName,
    });
  });*/
}
