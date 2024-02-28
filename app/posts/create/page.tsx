"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FSpinner from "@/components/FSpinner";
import FRow from "@/components/FRow";

type Post = {
  title: string;
  content: string;
};

function CreatePostForm() {
  const mutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const response = await axios.post(
        "http://localhost:5000/post/create/",
        {
          title: data.title,
          content: data.content,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const Schema = z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .max(20, "Title is too long"),
    content: z
      .string({
        required_error: "Content is required",
      })
      .max(200, "Content is too long"),
  });

  const form = useFormik<Post>({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    validationSchema: toFormikValidationSchema(Schema),
  });

  return (
    <div className="flex  flex-col items-center p-24">
      <form
        onSubmit={form.handleSubmit}
        className={"border shadow-sm border-gray-300 w-6/12 p-3 rounded-md"}
      >
        <Label>
          Name:
          <Input
            value={form.values.title}
            placeholder={"Name"}
            name={"title"}
            type="text"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.title && form.touched.title ? (
            <div className="text-red-500 text-sm">{form.errors.title}</div>
          ) : null}
        </Label>
        <Label>
          Description:
          <textarea
            rows={15}
            placeholder={"Description"}
            className="flex   w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={form.values.content}
            name={"content"}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.content && form.touched.content ? (
            <div className="text-red-500 text-sm">{form.errors.content}</div>
          ) : null}
        </Label>
        <div className={"flex gap-2 mt-2"}>
          <Button type="submit">
            <FRow>
              <FSpinner isVisible={mutation.isPending} />
              Create Post
            </FRow>
          </Button>
          <Link href="/posts">
            <Button variant={"secondary"}>Posts</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
