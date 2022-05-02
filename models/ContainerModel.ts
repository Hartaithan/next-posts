import { ReactNode } from "react";

export interface IContainerProps {
  children: ReactNode | string;
  grow?: boolean;
}
