export interface ICommentItem {
  id: number;
  created_at: string;
  updated_at: string | null;
  content: string;
  user: string;
  post_id: number;
}
