import { ApiError, Provider, Session, User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export interface IAuthContext {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: ApiError | null;
  }>;
  logout: () => Promise<{ error: ApiError | null }>;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
