import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "@/living-network.css";

const ROUTE_NETWORKS = [
  {
    match: (path) => path === "/",
    key: "home",
    core: "Experience",
    nodes: ["Potřeba", "Akce", "Důkaz", "Reflexe", "Ověření", "Passport"],
  },
  {
    match: (path) => path === "/jak-funguje",
    key: "method",
    core: "Metoda",
    nodes: ["Potřeba", "Akce", "Důkaz", "Reflexe", "Ověření", "Transfer"],
  },
  {
    match: (path) => path === "/pro-koho",
    key: "roles",
    core: "Experience",
    nodes: ["Žák", "Rodina", "Škola", "Mentor", "Partner", "Komunita"],
  },
  {
    match: (path) => path === "/pilot",
    key: "pilot",
    core: "Pilot",
    nodes: ["Škola", "Experience", "Žák", "Rodina", "Důkaz", "Ověření"],
  },
  {
    match: (path) => path === "/partneri",
    key: "partner",
    core: "Experience",
    nodes: ["Challenge", "Výstup", "Review", "Rozhodnutí", "Outcome", "Hranice"],
  },
  {
    match: (path) => path.startsWith("/program/"),
    key: "program",
    core: "Program",
    nodes: ["Potřeba", "Experience", "Lidé", "Důkaz", "Ověření", "Další krok"],
  },
  {
    match: (path) => path === "/zapojit-se",
    key: "join",
    core: "Vy",
    nodes: ["Role", "Experience", "Bezpečí", "Kontext", "Pilot", "Další krok"],
  },
  {
    match: (path) => path === "/o-projektu",
    key: "status",
    core: "Stav",
    nodes: ["Implementace", "Testování", "Pilot", "Outcome", "Impact", "Další krok"],
  },
  {
    match: (path) => path === "/soukromi",
    key: "privacy",
    core: "Soukromí",
    nodes: ["Účel", "Minimum dat", "Přístup", "Reflexe", "Evidence", "Důvěra"],
  },
  {
    match: (path) => path === "/bezpecnost",
    key: "safety",
    core: "Bezpečí",
    nodes: ["Role", "Hranice", "Dohled", "Důkaz", "Ověření", "Důvěra"],
  },
  {
    match: (path) => path === "/podminky",
    key: "terms",
    core: "Pravidla",
    nodes: ["Experience", "Role", "Data", "Hranice", "Odpovědnost", "Důvěra"],
  },
];

const FALLBACK_NETWORK = {
  key: "public",
  core: "Pansofie",
  nodes: ["Experience", "Role", "Důkaz", "Ověření", "Důvěra", "Další krok"],
};

const ORBIT_POINTS = [
  { x: 50, y: 12 },
  { x: 82, y: 31 },
  { x: 82, y: 69 },
  { x: 50, y: 88 },
  { x: 18, y: 69 },
  { x: 18, y: 31 },
];

function networkForPath(pathname) {
  return ROUTE_NETWORKS.find((network) => network.match(pathname)) || FALLBACK_NETWORK;
}

function targetSectionIndex(nodeIndex, nodeCount, sectionCount) {
  if (sectionCount <= 1) return 0;
  if (nodeCount <= 1) return Math.min(nodeIndex, sectionCount - 1);
  return Math.round((nodeIndex / (nodeCount - 1)) * (sectionCount - 1));
}

export default function PublicNetworkShell({ children }) {
  const location = useLocation();
  const shellRef = useRef(null);
  const sectionsRef = useRef([]);
  const frameRef = useRef(null);
  const [activeNode, setActiveNode] = useState(0);

  const network = useMemo(() => networkForPath(location.pathname), [location.pathname]);

  useEffect(() => {
    setActiveNode(0);
    document.body.classList.add("pansofie-network-live");
    document.body.dataset.networkRoute = network.key;

    return () => {
      document.body.classList.remove("pansofie-network-live");
      delete document.body.dataset.networkRoute;
    };
  }, [network.key]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    sectionsRef.current = sections;
    if (!sections.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const sectionIndex = sections.indexOf(visible.target);
        if (sectionIndex < 0) return;

        const mappedNode = targetSectionIndex(
          sectionIndex,
          Math.max(sections.length, 2),
          network.nodes.length,
        );
        setActiveNode(Math.min(network.nodes.length - 1, mappedNode));
      },
      { rootMargin: "-26% 0px -56% 0px", threshold: [0.08, 0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
    if (!shell) return undefined;

    let raf = 0;
    const onPointerMove = (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = Math.min(100, Math.max(0, (event.clientX / Math.max(window.innerWidth, 1)) * 100));
        const y = Math.min(100, Math.max(0, (event.clientY / Math.max(window.innerHeight, 1)) * 100));
        shell.style.setProperty("--network-pointer-x", `${x}%`);
        shell.style.setProperty("--network-pointer-y", `${y}%`);
        shell.style.setProperty("--network-parallax-x", `${(x - 50) * 0.055}px`);
        shell.style.setProperty("--network-parallax-y", `${(y - 50) * 0.045}px`);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const activateNode = (index) => {
    setActiveNode(index);
    const sections = sectionsRef.current;
    if (!sections.length) return;

    const sectionIndex = targetSectionIndex(index, network.nodes.length, sections.length);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    sections[sectionIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div
      ref={shellRef}
      className="public-network-shell"
      data-network-route={network.key}
      style={{ "--network-node-index": activeNode }}
    >
      <div className="network-cursor-glow" aria-hidden="true" />

      <div className="route-network-orbit" aria-hidden="true">
        <svg viewBox="0 0 100 100" role="presentation">
          <g className="route-orbit-edges">
            {ORBIT_POINTS.map((point, index) => (
              <line
                key={`core-${network.nodes[index]}`}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                data-active={index === activeNode}
              />
            ))}
            <line
              className="route-orbit-crosslink"
              x1={ORBIT_POINTS[activeNode].x}
              y1={ORBIT_POINTS[activeNode].y}
              x2={ORBIT_POINTS[(activeNode + 1) % ORBIT_POINTS.length].x}
              y2={ORBIT_POINTS[(activeNode + 1) % ORBIT_POINTS.length].y}
            />
          </g>

          <circle className="route-orbit-core-halo" cx="50" cy="50" r="15" />
          <circle className="route-orbit-core" cx="50" cy="50" r="9.5" />
          <text className="route-orbit-core-label" x="50" y="51.5" textAnchor="middle">{network.core}</text>

          {ORBIT_POINTS.map((point, index) => (
            <g key={network.nodes[index]} className="route-orbit-node" data-active={index === activeNode}>
              <circle cx={point.x} cy={point.y} r={index === activeNode ? 5.3 : 4.2} />
              <text
                x={point.x}
                y={point.y + (point.y < 50 ? -7 : 8)}
                textAnchor="middle"
              >
                {network.nodes[index]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="route-network-ribbon" aria-label="Živá mapa aktuální stránky">
        <div className="route-network-ribbon-inner">
          <span className="route-network-ribbon-core">{network.core}</span>
          <div className="route-network-ribbon-flow">
            {network.nodes.map((node, index) => (
              <React.Fragment key={node}>
                {index > 0 && <span className="route-network-ribbon-edge" aria-hidden="true"><i /></span>}
                <button
                  type="button"
                  className="route-network-ribbon-node"
                  data-network-node={node}
                  data-active={index === activeNode}
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

      <div className="network-scroll-rail" aria-hidden="true">
        <span className="network-scroll-track" />
        <span className="network-scroll-progress" />
        <i className="network-scroll-node" />
      </div>

      <div ref={frameRef} className="public-network-content">
        {children}
      </div>
    </div>
  );
}
