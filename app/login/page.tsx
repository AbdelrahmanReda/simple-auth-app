"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import FRow from "@/components/FRow";
import FSpinner from "@/components/FSpinner";
import { toast } from "react-toastify";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const { push } = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
        credentials: "include",
      });
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      push("/posts");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
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
          <FRow>
            <FSpinner isVisible={mutation.isPending} />
            Sign in
          </FRow>
        </Button>
        {mutation.isError && (
          <div className="text-red-500 text-sm">{mutation.error.message}</div>
        )}
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
          <Button variant={"secondary"} className="w-full">
            <img
              src={
                "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              }
              alt={"Google Logo"}
              className={"w-8 h-8"}
            />
            Sign in with Google
          </Button>
        </Link>
      </form>
    </div>
  );
};
export default Page;
