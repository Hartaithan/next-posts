export type Vote = "up" | "down";

export interface IVoteItem {
  id: number;
  created_at: string;
  updated_at: string | null;
  post_id: number;
  vote: Vote;
  user: string;
}
