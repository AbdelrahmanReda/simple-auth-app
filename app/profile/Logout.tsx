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
      .get("http://localhost:5000/logout/", {
        headers: {
          "Content-Type": "application/json",
          cookie: `connect.sid=${cookies.get("connect.sid")}`,
        },
        withCredentials: true,
      })
      .then(() => {
        removeCookie();
        router.push("/login");
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
