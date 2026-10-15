import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadSession() {
      const { data, error: sessionError } = await supabase.auth.getSession();

      if (!active) return;

      if (sessionError) {
        setError(sessionError.message);
      }

      setSession(data?.session ?? null);
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;

      setSession(nextSession);
      setLoading(false);
      setError("");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) return { error: "Supabase não configurado." };

    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (loginError) {
      const message =
        loginError.message === "Invalid login credentials"
          ? "E-mail ou senha inválidos."
          : loginError.message;

      setError(message);
      return { error: message };
    }

    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return { error: "Supabase não configurado." };

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      return { error: signOutError.message };
    }

    return { error: null };
  }, []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    error,
    signIn,
    signOut,
    isConfigured: isSupabaseConfigured,
  };
}
