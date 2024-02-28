import axios from "axios";
import { cookies } from "next/headers";
import React from "react";
import Logout from "./Logout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getAuth = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/get-user/`,

    {
      headers: {
        "Content-Type": "application/json",
        cookie: `connect.sid=${cookies().get("connect.sid")?.value}`,
      },
      withCredentials: true, // Send cookies with the request
    },
  );

  const data = response.data;
  return { data };
};

const Page: React.FC = async () => {
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

  data.user = JSON.parse(decodeURIComponent(cookieValue || ""));

  return (
    <>
      <div className="flex justify-between border-b p-3">
        {JSON.stringify(data)}
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
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.user?.picture}`}
                alt={data?.user?.name}
                className="rounded-full h-10 w-10"
              />
              <div className={"flex flex-col"}>
                <p className={"text-sm font-semibold"}>
                  {data?.user?.given_name}
                </p>
                <p className={"text-sm"}>{data?.user?.email}</p>
              </div>
            </div>
          )}
        </div>
        <Logout />
      </div>
      <div className={"flex  gap-1"}>
        <Link href={"/posts/create"}>
          <Button>Create Post</Button>
        </Link>
        <Link href={"/posts"}>
          <Button>Posts</Button>
        </Link>
      </div>
    </>
  );
};

export default Page;
