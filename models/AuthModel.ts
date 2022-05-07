import { User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface IAuthContext {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
  getUser: () => void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
