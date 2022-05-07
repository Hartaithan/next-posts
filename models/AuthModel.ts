import { ReactNode } from "react";

export interface IAuthContext {
  user: any;
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
  getUser: () => void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
