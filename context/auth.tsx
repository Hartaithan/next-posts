import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthProviderProps } from "../models/AuthModel";
import { supabase } from "../utils/supabaseClient";

const defaultValues: IAuthContext = {
  user: null,
  isAuth: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  getUser: () => {},
};

const AuthContext = createContext<IAuthContext>(defaultValues);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuth, setAuth] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const login = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setUser(null);
      setAuth(false);
      router.push("./login");
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user?.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUser(data);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuth,
    isLoading,
    login,
    logout,
    getUser,
  };

  useEffect(() => {
    const session = supabase.auth.session();
    if (session?.user) {
      setUser(session.user);
      setAuth(true);
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event == "SIGNED_IN" && session) {
        setUser(session.user);
        setAuth(true);
      }
      if (_event == "SIGNED_OUT") {
        logout();
      }
    });
  }, []); // eslint-disable-line

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
