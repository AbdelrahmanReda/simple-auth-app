import axiosInstance from "@/axiosInstance";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns, DataTable } from "@/components/data-table";
import { cookies } from "next/headers";

const fetchPosts = async ({ page = 1, perPage = 10 }) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&pageSize=${perPage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      data: {
        posts: [],
      },
    };
  }
};

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
}

const Page = async ({ searchParams }: { searchParams: any }) => {
  const { page } = searchParams;
  const { data } = await fetchPosts({ page: page, perPage: 3 });

  return (
    <div className="m-5">
      <div className="flex justify-between items-center">
        <h1 className={"text-3xl font-medium"}>Posts</h1>
        <Link href="/posts/create">
          <Button>Create Post</Button>
        </Link>
      </div>
      {JSON.stringify(data)}
      <div className={"mt-3"}>
        <DataTable columns={columns} data={data.posts} />
      </div>
    </div>
  );
};
export default Page;
