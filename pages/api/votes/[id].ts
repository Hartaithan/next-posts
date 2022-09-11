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
    value: body.vote,
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
    .match({ id: id, post_id: body.post_id, user: body.user })
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error updating vote", error: error });
  }
  const update = body.vote === "up" ? "increment" : "decrement";
  const { error: postVotesError } = await supabase.rpc(update, {
    x: 2,
    post_id: data.post_id,
  });
  if (postVotesError) {
    return res.status(400).json({
      message: "Error updating votes count in post",
      error: postVotesError,
    });
  }
  return res
    .status(201)
    .json({ message: "Vote successfully updated", post: data });
}

async function deleteVoteById(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
  } = req;
  const payload = {
    post_id: body.post_id,
    user: body.user,
  };
  const { data, error } = await supabase
    .from("votes")
    .delete()
    .match({ id: id, post_id: payload.post_id, user: payload.user })
    .single();
  if (error) {
    return res
      .status(400)
      .json({ message: "Error deleting vote", error: error });
  }
  const update = data.value === "up" ? "decrement" : "increment";
  const { error: postVotesError } = await supabase.rpc(update, {
    x: 1,
    post_id: data.post_id,
  });
  if (postVotesError) {
    return res.status(400).json({
      message: "Error updating votes count in post",
      error: postVotesError,
    });
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
