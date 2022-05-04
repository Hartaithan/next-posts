import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseClient";

async function getAllPosts(res: NextApiResponse) {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    return res
      .status(400)
      .json({ message: "Error fetching posts", error: error });
  }
  return res.status(200).json({ posts: data });
}

async function addPost(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const payload = {
    title: body.title,
    description: body.description,
    content: body.content,
    author: body.author,
  };
  const { data, error } = await supabase.from("posts").insert([payload]);
  if (error) {
    return res
      .status(400)
      .json({ message: "Error creating new post", error: error });
  }
  return res
    .status(201)
    .json({ message: "Post successfully created", post: data });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      getAllPosts(res);
    case "POST":
      addPost(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
