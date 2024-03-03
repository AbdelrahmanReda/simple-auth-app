"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { removeCookie } from "@/app/actions";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

const Logout = () => {
  const cookies = useCookies();
  const router = useRouter();
  const handleLogout = async (e: any) => {
    e.preventDefault();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/logout/`, {
        headers: {
          cookie: `connect.sid=${cookies.get("connect.sid")}`,
        },
        withCredentials: true,
      })
      .then(() => {
        removeCookie();
        router.push("/");
      });
  };
  return (
    <form className={"flex gap-1"} onSubmit={handleLogout}>
      <Button type={"submit"} variant={"destructive"} onClick={handleLogout}>
        Logout Now
      </Button>
    </form>
  );
};
export default Logout;
