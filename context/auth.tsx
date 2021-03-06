import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthProviderProps } from "../models/AuthModel";
import { supabase } from "../utils/supabaseClient";

const defaultValues: IAuthContext = {
  user: null,
  isAuth: false,
  isLoading: true,
  login: () =>
    Promise.resolve({
      session: null,
      user: null,
      error: null,
    }),
  logout: () =>
    Promise.resolve({
      error: null,
    }),
};

const AuthContext = createContext<IAuthContext>(defaultValues);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setAuth] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const login = async (email: string) => {
    setLoading(true);
    return await supabase.auth
      .signIn(
        { email },
        {
          redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    return await supabase.auth.signOut().finally(() => {
      setUser(null);
      setAuth(false);
      setLoading(false);
      router.push("./login");
    });
  };

  const handleAuthChange = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const value = {
    user,
    isAuth,
    isLoading,
    login,
    logout,
  };

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
      setAuth(true);
    }
    setLoading(false);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleAuthChange(_event, session);
        if (_event == "SIGNED_IN" && session) {
          setUser(session.user);
          setAuth(true);
        }
        if (_event == "SIGNED_OUT") {
          router.push("./login");
        }
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []); // eslint-disable-line

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
