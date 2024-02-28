import axiosInstance from "@/axiosInstance";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns, DataTable } from "@/components/data-table";

const fetchPosts = async () => {
  const response = await axiosInstance.get("http://localhost:5000/posts");
  const data = await response.data;
  return { data };
};

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
}

const Page = async () => {
  const { data } = await fetchPosts();

  return (
    <div className="m-5">
      <div className="flex justify-between items-center">
        <h1 className={"text-3xl font-medium"}>Posts</h1>
        <Link href="/posts/create">
          <Button>Create Post</Button>
        </Link>
      </div>
      <div className={"mt-3"}>
        <DataTable columns={columns} data={data.posts} />
      </div>
    </div>
  );
};
export default Page;
