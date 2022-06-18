import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseClient";

async function updateCommentById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
  } = req;
  const payload = {
    content: body.content,
  };
  const { data, error } = await supabase
    .from("comments")
    .update(payload)
    .eq("id", id)
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error updating comment", error: error });
  }
  return res
    .status(201)
    .json({ message: "Comment successfully updated", post: data });
}

async function deleteCommentById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const { error } = await supabase.from("comment").delete().eq("id", id);
  if (error) {
    return res
      .status(400)
      .json({ message: "Error deleting comment", error: error });
  }
  return res.status(204).json({ message: "Comment successfully deleted" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "PUT":
      return updateCommentById(req, res);
    case "DELETE":
      return deleteCommentById(req, res);
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
