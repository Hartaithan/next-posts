import { ReactNode } from "react";

export interface IMainLayoutProps {
  children: ReactNode | string;
  title: string;
}

export interface IMainContainerProps {
  children: ReactNode | string;
}
