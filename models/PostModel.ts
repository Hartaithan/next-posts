export interface IPostItem {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
}

export interface IPostItemProps {
  post: IPostItem;
}
