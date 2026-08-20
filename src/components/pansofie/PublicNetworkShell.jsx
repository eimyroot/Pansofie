import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import ReferenceNetworkStage from "@/components/pansofie/ReferenceNetworkStage";
import "@/living-network.css";
import "@/living-motion-r4.css";

const ROUTE_NETWORKS = [
  { match: (path) => path === "/", key: "home", core: "Experience", nodes: ["Potřeba", "Akce", "Důkaz", "Reflexe", "Ověření", "Passport"] },
  { match: (path) => path === "/jak-funguje", key: "method", core: "Metoda", nodes: ["Potřeba", "Akce", "Důkaz", "Reflexe", "Ověření", "Transfer"] },
  { match: (path) => path === "/pro-koho", key: "roles", core: "Experience", nodes: ["Žák", "Rodina", "Škola", "Mentor", "Partner", "Komunita"] },
  { match: (path) => path === "/pilot", key: "pilot", core: "Pilot", nodes: ["Škola", "Experience", "Žák", "Rodina", "Důkaz", "Ověření"] },
  { match: (path) => path === "/partneri", key: "partner", core: "Experience", nodes: ["Challenge", "Výstup", "Review", "Rozhodnutí", "Outcome", "Hranice"] },
  { match: (path) => path.startsWith("/program/"), key: "program", core: "Program", nodes: ["Potřeba", "Experience", "Lidé", "Důkaz", "Ověření", "Další krok"] },
  { match: (path) => path === "/zapojit-se", key: "join", core: "Vy", nodes: ["Role", "Experience", "Bezpečí", "Kontext", "Pilot", "Další krok"] },
  { match: (path) => path === "/o-projektu", key: "status", core: "Stav", nodes: ["Implementace", "Testování", "Pilot", "Outcome", "Impact", "Další krok"] },
  { match: (path) => path === "/soukromi", key: "privacy", core: "Soukromí", nodes: ["Účel", "Minimum dat", "Přístup", "Reflexe", "Evidence", "Důvěra"] },
  { match: (path) => path === "/bezpecnost", key: "safety", core: "Bezpečí", nodes: ["Role", "Hranice", "Dohled", "Důkaz", "Ověření", "Důvěra"] },
  { match: (path) => path === "/podminky", key: "terms", core: "Pravidla", nodes: ["Experience", "Role", "Data", "Hranice", "Odpovědnost", "Důvěra"] },
];

const FALLBACK_NETWORK = {
  key: "public",
  core: "Pansofie",
  nodes: ["Experience", "Role", "Důkaz", "Ověření", "Důvěra", "Další krok"],
};

function networkForPath(pathname) {
  return ROUTE_NETWORKS.find((network) => network.match(pathname)) || FALLBACK_NETWORK;
}

function targetSectionIndex(nodeIndex, nodeCount, sectionCount) {
  if (sectionCount <= 1) return 0;
  if (nodeCount <= 1) return Math.min(nodeIndex, sectionCount - 1);
  return Math.round((nodeIndex / (nodeCount - 1)) * (sectionCount - 1));
}

function targetNodeIndex(sectionIndex, sectionCount, nodeCount) {
  if (nodeCount <= 1) return 0;
  if (sectionCount <= 1) return Math.min(sectionIndex, nodeCount - 1);
  return Math.round((sectionIndex / (sectionCount - 1)) * (nodeCount - 1));
}

export default function PublicNetworkShell({ children }) {
  const location = useLocation();
  const shellRef = useRef(null);
  const sectionsRef = useRef([]);
  const manualStageUntilRef = useRef(0);
  const [activeNode, setActiveNode] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stageHost, setStageHost] = useState(null);

  const network = useMemo(() => networkForPath(location.pathname), [location.pathname]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(Boolean(media?.matches));
    sync();
    media?.addEventListener?.("change", sync);
    return () => media?.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    manualStageUntilRef.current = 0;
    setActiveNode(0);
    document.body.classList.add("pansofie-network-live", "pansofie-motion-r4", "pansofie-network-r5");
    document.body.dataset.networkRoute = network.key;

    const readyFrame = requestAnimationFrame(() => document.body.classList.add("pansofie-motion-ready"));
    return () => {
      cancelAnimationFrame(readyFrame);
      document.body.classList.remove("pansofie-network-live", "pansofie-motion-r4", "pansofie-motion-ready", "pansofie-network-r5");
      delete document.body.dataset.networkRoute;
    };
  }, [network.key]);

  useEffect(() => {
    const shell = shellRef.current;
    const main = shell?.querySelector("main");
    const firstAnchor = main?.querySelector(":scope > section") || main?.firstElementChild;
    if (!main || !firstAnchor || network.key === "public") {
      setStageHost(null);
      return undefined;
    }

    const host = document.createElement("div");
    host.className = "reference-network-host";
    host.dataset.referenceNetworkRoute = network.key;
    firstAnchor.insertAdjacentElement("afterend", host);
    setStageHost(host);

    return () => {
      setStageHost(null);
      host.remove();
    };
  }, [location.pathname, network.key]);

  useEffect(() => {
    const shell = shellRef.current;
    const sections = shell ? Array.from(shell.querySelectorAll("main > section")) : [];
    sectionsRef.current = sections;
    if (!sections.length) return undefined;

    sections.forEach((section, index) => {
      section.classList.add("network-motion-section");
      section.dataset.motionState = index === 0 ? "active" : "pending";
      section.style.setProperty("--network-section-order", String(index));
    });

    const markActiveSection = (sectionIndex) => {
      sections.forEach((section, index) => {
        section.dataset.motionState = index < sectionIndex ? "passed" : index === sectionIndex ? "active" : "pending";
      });
      if (performance.now() >= manualStageUntilRef.current) {
        setActiveNode(targetNodeIndex(sectionIndex, sections.length, network.nodes.length));
      }
    };

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const sectionIndex = sections.indexOf(visible.target);
        if (sectionIndex >= 0) markActiveSection(sectionIndex);
      },
      { rootMargin: "-24% 0px -52% 0px", threshold: [0.06, 0.16, 0.32, 0.58] },
    );

    if (observer) sections.forEach((section) => observer.observe(section));

    let raf = 0;
    const updateSectionMotion = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight * 0.52;
        const viewportSpan = Math.max(window.innerHeight * 0.8, 1);
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + Math.min(rect.height, window.innerHeight) * 0.5;
          const signed = (sectionCenter - viewportCenter) / viewportSpan;
          const proximity = Math.max(0, 1 - Math.abs(signed));
          section.style.setProperty("--network-section-proximity", proximity.toFixed(3));
          section.style.setProperty("--network-section-drift", `${Math.max(-1, Math.min(1, signed)) * 18}px`);
        });
      });
    };

    updateSectionMotion();
    window.addEventListener("scroll", updateSectionMotion, { passive: true });
    window.addEventListener("resize", updateSectionMotion, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("scroll", updateSectionMotion);
      window.removeEventListener("resize", updateSectionMotion);
      sections.forEach((section) => {
        section.classList.remove("network-motion-section");
        delete section.dataset.motionState;
        section.style.removeProperty("--network-section-order");
        section.style.removeProperty("--network-section-proximity");
        section.style.removeProperty("--network-section-drift");
      });
    };
  }, [location.pathname, network.nodes.length]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    let raf = 0;
    const updateScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = document.documentElement;
        const max = Math.max(1, root.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / max));
        shell.style.setProperty("--network-scroll", `${progress * 100}%`);
        shell.style.setProperty("--network-scroll-value", progress.toFixed(4));
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || reduceMotion) return undefined;

    let raf = 0;
    const onPointerMove = (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = Math.min(100, Math.max(0, (event.clientX / Math.max(window.innerWidth, 1)) * 100));
        const y = Math.min(100, Math.max(0, (event.clientY / Math.max(window.innerHeight, 1)) * 100));
        shell.style.setProperty("--network-pointer-x", `${x}%`);
        shell.style.setProperty("--network-pointer-y", `${y}%`);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reduceMotion]);

  const activateNode = (index) => {
    setActiveNode(index);
    const sections = sectionsRef.current;
    if (!sections.length) return;

    const sectionIndex = targetSectionIndex(index, network.nodes.length, sections.length);
    sections[sectionIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const selectStageNode = (index) => {
    manualStageUntilRef.current = performance.now() + 2200;
    setActiveNode(index);
  };

  return (
    <div
      ref={shellRef}
      className="public-network-shell public-network-shell--r4 public-network-shell--r5"
      data-network-route={network.key}
      data-active-network-node={activeNode}
      style={{ "--network-node-index": activeNode }}
    >
      <div className="network-cursor-glow" aria-hidden="true" />
      <div className="network-motion-sweep" aria-hidden="true" />

      <div className="route-network-ribbon route-network-ribbon--r4" aria-label="Živá mapa aktuální stránky">
        <div className="route-network-ribbon-inner">
          <span className="route-network-ribbon-core">{network.core}</span>
          <div className="route-network-ribbon-flow">
            {network.nodes.map((node, index) => (
              <React.Fragment key={node}>
                {index > 0 && <span className="route-network-ribbon-edge" data-passed={index <= activeNode} aria-hidden="true"><i /></span>}
                <button
                  type="button"
                  className="route-network-ribbon-node"
                  data-network-node={node}
                  data-active={index === activeNode}
                  data-passed={index < activeNode}
                  aria-pressed={index === activeNode}
                  onClick={() => activateNode(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{node}</strong>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {stageHost && createPortal(
        <ReferenceNetworkStage network={network} activeIndex={activeNode} onSelect={selectStageNode} />,
        stageHost,
      )}

      <div className="public-network-content public-network-content--r4">
        {children}
      </div>
    </div>
  );
}
