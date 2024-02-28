import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      redirect("/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
