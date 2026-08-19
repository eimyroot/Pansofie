import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Network,
  Pause,
  Play,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const ROLES = [
  {
    id: "learner",
    label: "Žák",
    icon: GraduationCap,
    gives: "práci, otázky a důkaz",
    gets: "ověřenou zkušenost",
    boundary: "Bez skóre lidské hodnoty.",
  },
  {
    id: "family",
    label: "Rodina",
    icon: HeartHandshake,
    gives: "životní kontext a podporu",
    gets: "smysluplnou bezpečnou roli",
    boundary: "Soukromá reflexe není automatický rodinný report.",
  },
  {
    id: "school",
    label: "Škola",
    icon: Building2,
    gives: "rámec, dohled a ověření",
    gets: "doložený průběh bez profilu dítěte",
    boundary: "Ověřuje práci, ne lidskou hodnotu.",
  },
  {
    id: "mentor",
    label: "Mentor",
    icon: UserRoundCheck,
    gives: "expertizu a zpětnou vazbu",
    gets: "jasně ohraničené zapojení",
    boundary: "Žádný neomezený soukromý kanál k dítěti.",
  },
  {
    id: "partner",
    label: "Partner",
    icon: BriefcaseBusiness,
    gives: "reálnou Challenge a review",
    gets: "výstup proti konkrétnímu briefu",
    boundary: "Hodnotí výstup, nikdy člověka.",
  },
  {
    id: "community",
    label: "Komunita",
    icon: Landmark,
    gives: "místní potřebu a prostředí",
    gets: "ověřitelný návrh nebo výstup",
    boundary: "Zapojení se řídí konkrétní Experience.",
  },
];

const SLOTS = [
  { x: 50, y: 10 },
  { x: 82, y: 29 },
  { x: 80, y: 70 },
  { x: 50, y: 89 },
  { x: 20, y: 70 },
  { x: 18, y: 29 },
];

function slotFor(roleIndex, selectedIndex) {
  return SLOTS[(roleIndex - selectedIndex + ROLES.length) % ROLES.length];
}

function linkGeometry(slot) {
  const dx = slot.x - 50;
  const dy = slot.y - 50;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return {
    "--constellation-length": `${distance}%`,
    "--constellation-angle": `${angle}deg`,
  };
}

export default function LivingRoleConstellation() {
  const [selectedId, setSelectedId] = useState("learner");
  const [autoMotion, setAutoMotion] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const selectedIndex = Math.max(0, ROLES.findIndex((role) => role.id === selectedId));
  const selected = useMemo(() => ROLES[selectedIndex], [selectedIndex]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const reduced = Boolean(media?.matches);
      setReduceMotion(reduced);
      if (reduced) setAutoMotion(false);
    };
    sync();
    media?.addEventListener?.("change", sync);
    return () => media?.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (!autoMotion || reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setSelectedId((current) => {
        const currentIndex = Math.max(0, ROLES.findIndex((role) => role.id === current));
        return ROLES[(currentIndex + 1) % ROLES.length].id;
      });
    }, 2350);
    return () => window.clearInterval(interval);
  }, [autoMotion, reduceMotion]);

  const chooseRole = (roleId) => {
    setAutoMotion(false);
    setSelectedId(roleId);
  };

  return (
    <section className="living-role-constellation" aria-label="Živá síť rolí kolem Experience">
      <div className="living-role-constellation-head">
        <div>
          <p className="eyebrow">ŽIVÁ SÍŤ ROLÍ</p>
          <h2>Experience je střed. Role se kolem ní mění podle toho, kdo právě jedná.</h2>
          <p>Vyberte uzel. Síť se přeskupí a zvýrazní konkrétní tok přínosu, hodnoty a bezpečné hranice.</p>
        </div>
        <button
          type="button"
          className="experience-motion-toggle"
          aria-pressed={!autoMotion}
          disabled={reduceMotion}
          onClick={() => setAutoMotion((value) => !value)}
        >
          {autoMotion && !reduceMotion ? <Pause size={14} /> : <Play size={14} />}
          {autoMotion && !reduceMotion ? "Pozastavit síť" : "Spustit síť"}
        </button>
      </div>

      <div className="living-role-constellation-stage" data-selected-role={selected.id}>
        <div className="living-role-constellation-aura" aria-hidden="true" />

        {ROLES.map((role, index) => {
          const slot = slotFor(index, selectedIndex);
          return (
            <span
              key={`link-${role.id}`}
              className="living-role-constellation-link"
              data-active={role.id === selected.id}
              data-related={role.id === "school" || role.id === selected.id}
              style={linkGeometry(slot)}
              aria-hidden="true"
            >
              <i />
            </span>
          );
        })}

        <div className="living-role-constellation-core">
          <span aria-hidden="true"><Network size={25} /></span>
          <strong>Experience</strong>
          <small>společná práce</small>
        </div>

        {ROLES.map((role, index) => {
          const Icon = role.icon;
          const slot = slotFor(index, selectedIndex);
          const active = role.id === selected.id;
          return (
            <button
              key={role.id}
              type="button"
              className="living-role-constellation-node"
              data-constellation-role={role.id}
              data-active={active}
              aria-pressed={active}
              style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
              onClick={() => chooseRole(role.id)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{role.label}</span>
            </button>
          );
        })}
      </div>

      <div key={selected.id} className="living-role-constellation-summary" aria-live={autoMotion ? "off" : "polite"}>
        <div>
          <span>PŘINÁŠÍ</span>
          <strong>{selected.label}</strong>
          <p>{selected.gives}</p>
        </div>
        <div className="living-role-constellation-flow" aria-hidden="true"><i /><b>→</b></div>
        <div>
          <span>ZÍSKÁVÁ</span>
          <strong>z Experience</strong>
          <p>{selected.gets}</p>
        </div>
        <div className="living-role-constellation-boundary">
          <ShieldCheck size={17} aria-hidden="true" />
          <p>{selected.boundary}</p>
        </div>
      </div>
    </section>
  );
}
