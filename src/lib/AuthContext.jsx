import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/api/supabaseClient";
import { PATHS } from "@/lib/pansofieData";

const AuthContext = createContext(null);

const emptyPaths = () => PATHS.map((path) => ({ id: path.id, experiences: 0, missions: 0 }));

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("member");
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const loadUserData = async (authUser) => {
    if (!authUser) {
      setUser(null);
      setProfile(null);
      setRole("member");
      return;
    }

    setUser(authUser);

    const [{ data: profileRow }, { data: roleRow }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, full_name, location, bio")
        .eq("id", authUser.id)
        .maybeSingle(),
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authUser.id)
        .maybeSingle(),
    ]);

    setProfile({
      id: authUser.id,
      email: authUser.email,
      name: profileRow?.full_name || authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Člen Pansofie",
      location: profileRow?.location || "",
      intro: profileRow?.bio || "",
      role: roleRow?.role === "admin" ? "Administrátor" : "Člen Pansofie",
      paths: emptyPaths(),
      interests: [],
      skills: [],
      offers: [],
      seeks: [],
      availability: "",
      contactable: false,
      completedMissions: 0,
      projects: 0,
      portfolioItems: 0,
    });
    setRole(roleRow?.role === "admin" ? "admin" : "member");
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session || null);
      await loadUserData(data.session?.user || null);
      if (active) setIsLoadingAuth(false);
    };

    bootstrap();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return;
      setSession(nextSession || null);
      await loadUserData(nextSession?.user || null);
      if (active) setIsLoadingAuth(false);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setRole("member");
  };

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    await loadUserData(data.user || null);
  };

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      role,
      isAdmin: role === "admin",
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      logout,
      refreshUser,
    }),
    [session, user, profile, role, isLoadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
