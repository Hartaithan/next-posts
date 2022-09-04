import { ICommentItem } from "./CommentModel";

export interface IPostItem {
  id: number;
  created_at: string;
  updated_at: string | null;
  image_url: string;
  title: string;
  description: string;
  content: string;
  user: string;
  comments: ICommentItem[];
  votes: number;
}

export interface IPostItemProps {
  height?: number;
  main?: boolean;
  post: IPostItem;
}

export interface IPostsResponse {
  posts: IPostItem[];
}

export interface IPostResponse {
  post: IPostItem;
}

export interface IPostPayload {
  title: string;
  description: string;
  content: string;
  image_url: string | null;
  user: string | null | undefined;
}
