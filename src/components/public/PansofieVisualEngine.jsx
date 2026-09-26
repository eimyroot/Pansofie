import Link from "next/link";

const PATH_POINTS = [
  { x: 50, y: 15 }, { x: 76, y: 26 }, { x: 83, y: 54 }, { x: 68, y: 79 },
  { x: 37, y: 84 }, { x: 16, y: 62 }, { x: 20, y: 31 },
];

const DOMAIN_POINTS = [
  { x: 50, y: 4 }, { x: 66, y: 7 }, { x: 80, y: 15 }, { x: 91, y: 28 },
  { x: 96, y: 45 }, { x: 93, y: 64 }, { x: 83, y: 80 }, { x: 68, y: 91 },
  { x: 49, y: 96 }, { x: 31, y: 91 }, { x: 16, y: 81 }, { x: 7, y: 65 },
  { x: 4, y: 47 }, { x: 8, y: 28 }, { x: 20, y: 14 }, { x: 34, y: 7 },
];

const PATH_ACCENTS = ["lime", "cyan", "gold", "coral", "violet", "mint", "amber"];

function Lines({ points, center = { x: 50, y: 50 }, className = "" }) {
  return <svg className={`pve-lines ${className}`} viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
    {points.map((point, index) => <line key={index} x1={center.x} y1={center.y} x2={point.x} y2={point.y}/>) }
  </svg>;
}

function Core({ kicker = "PANSOFIE", title = "Všechno souvisí se vším", detail = "poznání · zkušenost · vztahy · svět" }) {
  return <div className="pve-core">
    <span>{kicker}</span>
    <strong>{title}</strong>
    <small>{detail}</small>
  </div>;
}

export function PansofieVisualEngine({ mode = "ecosystem", domains = [], paths = [], projects = [], community = [], flow = [], kicker, title, detail, compact = false }) {
  if (mode === "flow") {
    const route = [
      { x: 14, y: 70 }, { x: 30, y: 45 }, { x: 47, y: 61 },
      { x: 64, y: 34 }, { x: 83, y: 48 }, { x: 76, y: 76 },
    ];
    const entries = flow.slice(0, 6).map((item) => typeof item === "string" ? { label: item } : item);
    const PolyNode = ({ item, index }) => {
      const Tag = item.href ? Link : "div";
      const props = item.href ? { href: item.href } : {};
      return <Tag {...props} className={`pve-flow-node is-${PATH_ACCENTS[index % PATH_ACCENTS.length]}`} style={{ "--x": `${route[index].x}%`, "--y": `${route[index].y}%` }}>
        <span>{String(index + 1).padStart(2,"0")}</span><strong>{item.label}</strong>
      </Tag>;
    };
    const polyline = entries.map((_, index) => `${route[index].x},${route[index].y}`).join(" ");
    return <figure className={`pve-stage pve-stage--flow${compact ? " is-compact" : ""}`} aria-label={`${kicker || "Pansofie"}: ${entries.map((item) => item.label).join(", ")}`}>
      <svg className="pve-flow-line" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none"><polyline points={polyline}/></svg>
      <div className="pve-field-label"><span>{kicker || "PANSOFIE"}</span><strong>{title || "Souvislosti v pohybu"}</strong><small>{detail || "poznání se mění ve zkušenost"}</small></div>
      {entries.map((item,index)=><PolyNode item={item} index={index} key={`${item.label}-${index}`}/>)}
      <div className="pve-field-pulse pve-field-pulse--one" aria-hidden="true"/><div className="pve-field-pulse pve-field-pulse--two" aria-hidden="true"/>
      <figcaption>Jednotlivé kroky dávají smysl až ve vztahu k tomu, co bylo před nimi a co může následovat.</figcaption>
    </figure>;
  }

  if (mode === "paths") {
    return <figure className={`pve-stage pve-stage--paths${compact ? " is-compact" : ""}`} aria-label="Vizuální mapa sedmi cest Pansofie">
      <div className="pve-orbit pve-orbit--inner" aria-hidden="true"/><div className="pve-orbit pve-orbit--outer" aria-hidden="true"/>
      <Lines points={PATH_POINTS}/><Core kicker="7 CEST" title="Růst nemá jednu osu" detail="sedm směrů · žádný žebříček"/>
      {paths.slice(0,7).map((path,index) => <Link href={`#${path.id}`} className={`pve-node pve-node--path is-${PATH_ACCENTS[index]}`} style={{ "--x": `${PATH_POINTS[index].x}%`, "--y": `${PATH_POINTS[index].y}%` }} key={path.id}><span>{String(index+1).padStart(2,"0")}</span><strong>{path.title}</strong></Link>)}
      <figcaption>Každá cesta se může potkat s více oblastmi života i projekty současně.</figcaption>
    </figure>;
  }

  if (mode === "domains") {
    return <figure className={`pve-stage pve-stage--domains${compact ? " is-compact" : ""}`} aria-label="Vizuální mapa šestnácti oblastí života Pansofie">
      <div className="pve-orbit pve-orbit--inner" aria-hidden="true"/><div className="pve-orbit pve-orbit--outer" aria-hidden="true"/>
      <Lines points={DOMAIN_POINTS}/><Core kicker="16 OBLASTÍ" title="Jeden život" detail="žádné izolované šuplíky"/>
      {domains.slice(0,16).map((domain,index) => <Link href={`#${domain.id}`} className="pve-node pve-node--domain" style={{ "--x": `${DOMAIN_POINTS[index].x}%`, "--y": `${DOMAIN_POINTS[index].y}%` }} key={domain.id}><span>{String(index+1).padStart(2,"0")}</span><strong>{domain.title}</strong></Link>)}
      <figcaption>Oblasti jsou body orientace. Smysl vzniká ve vztazích mezi nimi.</figcaption>
    </figure>;
  }

  if (mode === "projects") {
    const points=[{x:20,y:28},{x:78,y:24},{x:82,y:73},{x:23,y:76}];
    return <figure className="pve-stage pve-stage--projects" aria-label="Pansofie projekty jako propojené vstupy do praxe">
      <div className="pve-orbit pve-orbit--outer" aria-hidden="true"/><Lines points={points}/><Core kicker="PROJEKTY" title="Souvislosti v praxi" detail="místo · potřeba · lidé · zkušenost"/>
      {projects.slice(0,4).map((project,index)=><Link href={project.href} className={`pve-project-node is-${PATH_ACCENTS[index]}`} style={{"--x":`${points[index].x}%`,"--y":`${points[index].y}%`}} key={project.title}><small>{project.label}</small><strong>{project.title}</strong></Link>)}
      <figcaption>Projekt propojuje více oblastí a cest najednou. Není to další oddělený šuplík.</figcaption>
    </figure>;
  }

  if (mode === "community") {
    const points=[{x:50,y:11},{x:85,y:32},{x:76,y:78},{x:24,y:78},{x:15,y:32}];
    return <figure className="pve-stage pve-stage--community" aria-label="Síť bezpečných komunitních kontextů Pansofie">
      <div className="pve-orbit pve-orbit--outer" aria-hidden="true"/><Lines points={points}/><Core kicker="KOMUNITA" title="Vztahy kolem skutečné práce" detail="bez veřejného katalogu lidí"/>
      {community.slice(0,5).map((item,index)=><Link href={item.href} className="pve-community-node" style={{"--x":`${points[index].x}%`,"--y":`${points[index].y}%`}} key={item.title}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong></Link>)}
      <figcaption>Role a místa se propojují přes účel, projekt a oprávnění.</figcaption>
    </figure>;
  }

  return <figure className={`pve-stage pve-stage--ecosystem${compact ? " is-compact" : ""}`} aria-label="Pansofie jako propojený systém šestnácti oblastí a sedmi cest">
    <div className="pve-orbit pve-orbit--inner" aria-hidden="true"/><div className="pve-orbit pve-orbit--outer" aria-hidden="true"/>
    <Lines points={PATH_POINTS}/><Lines points={DOMAIN_POINTS} className="pve-lines--soft"/>
    <Core/>
    {paths.slice(0,7).map((path,index)=><Link href={`/7-cest#${path.id}`} className={`pve-node pve-node--path is-${PATH_ACCENTS[index]}`} style={{"--x":`${PATH_POINTS[index].x}%`,"--y":`${PATH_POINTS[index].y}%`}} key={path.id}><span>{String(index+1).padStart(2,"0")}</span><strong>{path.title}</strong></Link>)}
    {domains.slice(0,16).map((domain,index)=><Link href={`/16-oblasti#${domain.id}`} className="pve-domain-dot" style={{"--x":`${DOMAIN_POINTS[index].x}%`,"--y":`${DOMAIN_POINTS[index].y}%`}} title={domain.title} aria-label={`Oblast ${domain.title}`} key={domain.id}><span>{index+1}</span></Link>)}
    <figcaption>16 oblastí · 7 cest · projekty · lidé · místa. Jeden propojený rámec.</figcaption>
  </figure>;
}
