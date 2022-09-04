import { NextApiRequest, NextApiResponse } from "next";
import { validatePayload } from "../../../helpers/payload";
import { supabase } from "../../../utils/supabaseClient";

async function addComment(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const payload = {
    post_id: body.post_id,
    content: body.content,
    user: body.user,
  };
  const results = validatePayload(payload);
  if (results.length > 0) {
    return res
      .status(400)
      .json({ message: "Invalid payload", errors: results });
  }
  const { data, error } = await supabase
    .from("comments")
    .insert([payload])
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error creating new comment", error: error });
  }
  return res
    .status(201)
    .json({ message: "Comment successfully created", comment: data });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return addComment(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
