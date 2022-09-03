import { NextApiRequest, NextApiResponse } from "next";
import { validatePayload } from "../../../helpers/payload";
import { supabase } from "../../../utils/supabaseClient";

async function getVotesByPostId(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("post_id", id);
  if (error) {
    return res
      .status(400)
      .json({ message: "Error fetching votes", error: error });
  }
  return res.status(200).json({ votes: data });
}

async function updateVoteById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
  } = req;
  const payload = {
    vote: body.vote,
    post_id: body.post_id,
    user: body.user,
  };
  const results = validatePayload(payload);
  if (results.length > 0) {
    return res
      .status(400)
      .json({ message: "Invalid payload", errors: results });
  }
  const { data, error } = await supabase
    .from("votes")
    .update(payload)
    .eq("id", id)
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error updating vote", error: error });
  }
  return res
    .status(201)
    .json({ message: "Vote successfully updated", post: data });
}

async function deleteVoteById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const { error } = await supabase.from("votes").delete().eq("id", id);
  if (error) {
    return res
      .status(400)
      .json({ message: "Error deleting vote", error: error });
  }
  return res.status(200).json({ message: "Vote successfully deleted" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return getVotesByPostId(req, res);
    case "PUT":
      return updateVoteById(req, res);
    case "DELETE":
      return deleteVoteById(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
