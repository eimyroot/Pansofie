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

    const r18ProfileQuery = await supabase
      .from("profiles")
      .select("id, full_name, location, bio, network_role, offers_text, seeks_text, onboarding_completed_at, onboarding_track, terms_accepted_at, terms_accepted_version, dialogue_code_accepted_at, dialogue_code_accepted_version")
      .eq("id", authUser.id)
      .maybeSingle();

    let profileResult = r18ProfileQuery;
    let onboardingSupported = true;
    let adultOnboardingSupported = true;

    if (r18ProfileQuery.error) {
      adultOnboardingSupported = false;
      console.warn("PANSOFIE R18 profile schema unavailable:", r18ProfileQuery.error.message);

      const r14ProfileQuery = await supabase
        .from("profiles")
        .select("id, full_name, location, bio, network_role, offers_text, seeks_text, onboarding_completed_at")
        .eq("id", authUser.id)
        .maybeSingle();

      profileResult = r14ProfileQuery;
      if (r14ProfileQuery.error) {
        onboardingSupported = false;
        console.warn("PANSOFIE extended profile schema unavailable:", r14ProfileQuery.error.message);
        profileResult = await supabase
          .from("profiles")
          .select("id, full_name, location, bio")
          .eq("id", authUser.id)
          .maybeSingle();
      }
    }

    const roleResult = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authUser.id)
      .maybeSingle();

    if (profileResult.error) console.error("PANSOFIE profile load failed:", profileResult.error.message);
    if (roleResult.error) console.error("PANSOFIE role load failed:", roleResult.error.message);

    const profileRow = profileResult.data;
    const roleRow = roleResult.data;

    setProfile({
      id: authUser.id,
      email: authUser.email,
      name:
        profileRow?.full_name ||
        authUser.user_metadata?.full_name ||
        authUser.email?.split("@")[0] ||
        "Člen Pansofie",
      location: profileRow?.location || "",
      intro: profileRow?.bio || "",
      networkRole: profileRow?.network_role || "",
      onboardingTrack: profileRow?.onboarding_track || "",
      offersText: profileRow?.offers_text || "",
      seeksText: profileRow?.seeks_text || "",
      onboardingSupported,
      adultOnboardingSupported,
      onboardingCompletedAt: profileRow?.onboarding_completed_at || null,
      onboardingCompleted: onboardingSupported ? Boolean(profileRow?.onboarding_completed_at) : true,
      termsAcceptedAt: profileRow?.terms_accepted_at || null,
      termsAcceptedVersion: profileRow?.terms_accepted_version || null,
      dialogueCodeAcceptedAt: profileRow?.dialogue_code_accepted_at || null,
      dialogueCodeAcceptedVersion: profileRow?.dialogue_code_accepted_version || null,
      role: roleRow?.role === "admin" ? "Administrátor" : "Člen Pansofie",
      paths: emptyPaths(),
      interests: [],
      skills: [],
      offers: profileRow?.offers_text ? [profileRow.offers_text] : [],
      seeks: profileRow?.seeks_text ? [profileRow.seeks_text] : [],
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
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;

      if (error) console.error("PANSOFIE session bootstrap failed:", error.message);
      setSession(data.session || null);
      await loadUserData(data.session?.user || null);
      if (active) setIsLoadingAuth(false);
    };

    bootstrap();

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;

      setSession(nextSession || null);
      setIsLoadingAuth(true);

      setTimeout(async () => {
        if (!active) return;
        await loadUserData(nextSession?.user || null);
        if (active) setIsLoadingAuth(false);
      }, 0);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
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
