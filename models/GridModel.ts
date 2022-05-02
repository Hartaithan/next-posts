import { ReactNode } from "react";
import { IPost } from "./PostModel";

export interface IGridProps {
  children: ReactNode;
}

export interface IGridItemProps {
  post: IPost;
}
