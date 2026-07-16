"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type AuthResult = Promise<{ error: string | null }>;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string, phone?: string) => AuthResult;
  signIn: (email: string, password: string) => AuthResult;
  signInWithOtp: (phone: string, name?: string) => AuthResult;
  verifyOtp: (phone: string, token: string) => AuthResult;
  signInWithGoogle: (next?: string) => AuthResult;
  requestPasswordReset: (email: string) => AuthResult;
  signOut: () => Promise<void>;
}

const emptyResult = async () => ({ error: null });

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: emptyResult,
  signIn: emptyResult,
  signInWithOtp: emptyResult,
  verifyOtp: emptyResult,
  signInWithGoogle: emptyResult,
  requestPasswordReset: emptyResult,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string, phone?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name || "", phone: phone || "" },
      },
    });

    if (!error) {
      const accessToken = data.session?.access_token
        || (await supabase.auth.getSession()).data.session?.access_token;
      if (accessToken) {
        fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ type: "welcome" }),
        }).catch(() => {});
      }
    }

    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signInWithOtp = async (phone: string, name?: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { data: { full_name: name || "" } },
    });
    return { error: error?.message ?? null };
  };

  const verifyOtp = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
    return { error: error?.message ?? null };
  };

  const signInWithGoogle = async (next?: string) => {
    const callback = new URL("/account", window.location.origin);
    if (next?.startsWith("/") && !next.startsWith("//") && next !== "/account") {
      callback.searchParams.set("next", next);
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callback.toString() },
    });
    return { error: error?.message ?? null };
  };

  const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithOtp,
      verifyOtp,
      signInWithGoogle,
      requestPasswordReset,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
