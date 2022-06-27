import type { NextApiRequest, NextApiResponse } from "next";
import { validatePayload } from "../../../helpers/payload";
import { supabase } from "../../../utils/supabaseClient";

async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { limit },
  } = req;
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .limit(Number(limit));
  if (postsError) {
    return res
      .status(400)
      .json({ message: "Error fetching posts", error: postsError });
  }
  return res.status(200).json({ posts });
}

async function addPost(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const payload = {
    title: body.title,
    description: body.description,
    content: body.content,
    image_url: body.image_url,
    user: body.user,
  };
  const results = validatePayload(payload);
  if (results.length > 0) {
    return res
      .status(400)
      .json({ message: "Invalid payload", errors: results });
  }
  const { data, error } = await supabase
    .from("posts")
    .insert([payload])
    .single();
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
      return getAllPosts(req, res);
    case "POST":
      return addPost(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
