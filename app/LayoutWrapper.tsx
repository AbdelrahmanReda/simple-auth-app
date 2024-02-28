import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Logout from "@/app/profile/Logout";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieValue = cookies().get("myCustomCookie")?.value;

  let data = {
    user: {
      provider: "google",
      picture:
        "https://lh3.googleusercontent.com/a-/AOh14Gjv3W3k3jxw8xZgP3m8OvUwz1t8W6wZ3tXyZ9j7",
      given_name: "John",
      email: "",
      name: "John Doe",
    },
  };

  if (cookieValue) {
    data.user = JSON.parse(decodeURIComponent(cookieValue || ""));
  }

  if (!cookieValue) {
    return <div>{children}</div>;
  }

  return (
    <>
      <div className="flex justify-between border-b p-3 bg-gray-50">
        <div className="flex flex-col gap-1">
          {data?.user?.provider === "google" ? (
            <div className={"flex gap-1 "}>
              <img
                src={data?.user?.picture}
                className="rounded-full h-10 w-10"
              />
              <div className={"flex flex-col"}>
                <p className={"text-sm font-semibold"}>
                  {data?.user?.given_name}
                </p>
                <p className={"text-sm"}>{data?.user?.email}</p>
              </div>
            </div>
          ) : (
            <div className={"flex gap-1"}>
              <Avatar>
                <AvatarImage
                  src={`http://localhost:5000/${data?.user?.picture}`}
                />
                <AvatarFallback> A U </AvatarFallback>
              </Avatar>

              <div className={"flex flex-col"}>
                <p className={"text-sm font-semibold"}>
                  {data?.user?.given_name ?? "Anonymous User"}
                </p>
                <p className={"text-sm"}>{data?.user?.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/posts/create">
            <Button variant={"secondary"}>Create Post</Button>
          </Link>

          <Link href="/posts">
            <Button variant={"secondary"}>Posts</Button>
          </Link>

          <Link href="/sessions">
            <Button variant={"secondary"}>Session</Button>
          </Link>
        </div>
        <Logout />
      </div>

      {children}
    </>
  );
}
