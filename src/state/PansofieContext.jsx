import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEMO_MATERIALS, DEMO_SCHOOL_PROJECTS } from "../lib/demoData";

const STORAGE_KEY = "pansofie-1.0:state";

const initialState = {
  profile: {
    name: "",
    role: "",
    joinedAt: new Date().toISOString(),
  },
  materials: DEMO_MATERIALS,
  schoolProjects: DEMO_SCHOOL_PROJECTS,
  ledger: [],
  mentoring: {},
  missions: {},
};

function safeLoad() {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return {
      ...initialState,
      ...parsed,
      profile: { ...initialState.profile, ...(parsed.profile || {}) },
      materials: (() => {
        const persisted = Array.isArray(parsed.materials) ? parsed.materials : [];
        const persistedIds = new Set(persisted.map((item) => item?.id));
        const missingDemo = DEMO_MATERIALS.filter((item) => !persistedIds.has(item.id));
        return [...persisted, ...missingDemo];
      })(),
      schoolProjects: (() => {
        const persisted = Array.isArray(parsed.schoolProjects) ? parsed.schoolProjects : [];
        const persistedIds = new Set(persisted.map((item) => item?.id));
        const missingDemo = DEMO_SCHOOL_PROJECTS.filter((item) => !persistedIds.has(item.id));
        return [...persisted, ...missingDemo];
      })(),
      ledger: Array.isArray(parsed.ledger) ? parsed.ledger : [],
      mentoring: parsed.mentoring || {},
      missions: parsed.missions || {},
    };
  } catch {
    return initialState;
  }
}

const Context = createContext(null);

export function PansofieProvider({ children }) {
  const [state, setState] = useState(safeLoad);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => ({
    state,
    updateProfile(patch) {
      setState((current) => ({
        ...current,
        profile: { ...current.profile, ...patch },
      }));
    },
    addMaterial(material) {
      const item = {
        ...material,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        demo: false,
        createdByMe: true,
        ownerType: material.ownerType || "community",
        status: "available",
      };
      setState((current) => ({ ...current, materials: [item, ...current.materials] }));
      return item;
    },
    reserveMaterial(id) {
      setState((current) => ({
        ...current,
        materials: current.materials.map((item) =>
          item.id === id ? { ...item, status: item.status === "available" ? "reserved" : item.status } : item
        ),
      }));
    },
    closeMaterialCircle(id) {
      setState((current) => {
        const item = current.materials.find((entry) => entry.id === id);
        if (!item || item.status === "handed_over") return current;
        const direction = item.createdByMe ? "give" : "receive";
        return {
          ...current,
          materials: current.materials.map((entry) =>
            entry.id === id ? { ...entry, status: "handed_over" } : entry
          ),
          ledger: [
            {
              id: crypto.randomUUID(),
              type: direction,
              title: item.title,
              localPrototype: true,
              createdAt: new Date().toISOString(),
            },
            ...current.ledger,
          ],
        };
      });
    },
    addSchoolProject(project) {
      const item = {
        ...project,
        id: crypto.randomUUID(),
        demo: false,
        createdAt: new Date().toISOString(),
      };
      setState((current) => ({
        ...current,
        schoolProjects: [item, ...current.schoolProjects],
      }));
      return item;
    },
    startMentoring(mentorId) {
      setState((current) => ({
        ...current,
        mentoring: {
          ...current.mentoring,
          [mentorId]: current.mentoring[mentorId] || { status: "pending" },
        },
      }));
    },
    closeMentoringCircle(mentor) {
      setState((current) => ({
        ...current,
        mentoring: {
          ...current.mentoring,
          [mentor.id]: { status: "closed", closedAt: new Date().toISOString() },
        },
        ledger: [
          {
            id: crypto.randomUUID(),
            type: "receive",
            title: `Setkání · ${mentor.title}`,
            localPrototype: true,
            createdAt: new Date().toISOString(),
          },
          ...current.ledger,
        ],
      }));
    },
    acceptMission(mission) {
      setState((current) => ({
        ...current,
        missions: {
          ...current.missions,
          [mission.id]: {
            id: mission.id,
            title: mission.title,
            audience: mission.audience,
            status: current.missions[mission.id]?.status || "accepted",
            acceptedAt: current.missions[mission.id]?.acceptedAt || new Date().toISOString(),
          },
        },
      }));
    },
    completeMission(mission) {
      setState((current) => {
        const existing = current.missions[mission.id];
        if (!existing || existing.status === "completed") return current;
        return {
          ...current,
          missions: {
            ...current.missions,
            [mission.id]: {
              ...existing,
              status: "completed",
              completedAt: new Date().toISOString(),
            },
          },
          ledger: [
            {
              id: crypto.randomUUID(),
              type: "give",
              title: `Mise · ${mission.title}`,
              localPrototype: true,
              createdAt: new Date().toISOString(),
            },
            ...current.ledger,
          ],
        };
      });
    },
    resetPrototype() {
      setState({
        ...initialState,
        profile: { ...initialState.profile, joinedAt: new Date().toISOString() },
      });
    },
  }), [state]);

  return <Context.Provider value={api}>{children}</Context.Provider>;
}

export function usePansofie() {
  const value = useContext(Context);
  if (!value) throw new Error("usePansofie must be used inside PansofieProvider");
  return value;
}
