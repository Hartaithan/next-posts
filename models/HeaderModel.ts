export interface IHeaderLink {
  name: string;
  path: string;
}

export const navigation: IHeaderLink[] = [
  { name: "Home", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "Add post", path: "/posts/add" },
];
