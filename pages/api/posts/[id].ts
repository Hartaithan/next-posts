import type { NextApiRequest, NextApiResponse } from "next";
import { validatePayload } from "../../../helpers/payload";
import { supabase } from "../../../utils/supabaseClient";

async function getPostById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const { data, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", id)
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error fetching posts", error: error });
  }
  if (user && user.email !== undefined) {
    const { data: vote, error: voteError } = await supabase
      .from("votes")
      .select("*")
      .match({ post_id: id, user: user.email })
      .single();
    if (voteError) {
      return res.status(200).json({ post: data, vote: null });
    }
    return res.status(200).json({ post: data, vote: vote });
  }
  return res.status(200).json({ post: data, vote: null });
}

async function updatePostById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
  } = req;
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
    .update(payload)
    .eq("id", id)
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error updating post", error: error });
  }
  return res
    .status(201)
    .json({ message: "Post successfully updated", post: data });
}

async function deletePostById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    return res
      .status(400)
      .json({ message: "Error deleting post", error: error });
  }
  return res.status(200).json({ message: "Post successfully deleted" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return getPostById(req, res);
    case "PUT":
      return updatePostById(req, res);
    case "DELETE":
      return deletePostById(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
