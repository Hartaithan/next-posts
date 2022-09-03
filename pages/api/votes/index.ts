import { NextApiRequest, NextApiResponse } from "next";
import { validatePayload } from "../../../helpers/payload";
import { supabase } from "../../../utils/supabaseClient";

async function addVote(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const payload = {
    vote: body.vote,
    post_id: body.post_id,
  };
  const results = validatePayload(payload);
  if (results.length > 0) {
    return res
      .status(400)
      .json({ message: "Invalid payload", errors: results });
  }
  const { data, error } = await supabase
    .from("votes")
    .insert([payload])
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error creating new vote", error: error });
  }
  return res
    .status(201)
    .json({ message: "Vote successfully created", vote: data });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return addVote(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
