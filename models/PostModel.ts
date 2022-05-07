export interface IPostItem {
  id: number;
  created_at: string;
  updated_at: string | null;
  image_url: string;
  title: string;
  description: string;
  content: string;
  user: string;
}

export interface IPostItemProps {
  post: IPostItem;
}

export interface IPostsResponse {
  posts: IPostItem[];
}

export interface IPostResponse {
  post: IPostItem;
}
