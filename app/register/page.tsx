"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const { push } = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = fetch("http://localhost:5000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await (await response).json();
      console.log(data);
      push("/posts");
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return (
    <div className="flex  flex-col items-center p-24">
      <form className="flex flex-col w-5/12   gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <Link href={"http://localhost:5000/auth/google"}>
          <Button variant={"secondary"} className="w-full">
            <img
              src={
                "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              }
              alt={"Google Logo"}
              className={"w-8 h-8"}
            />
            Sign up with Google
          </Button>
        </Link>
      </form>
    </div>
  );
};
export default Page;
