import Image from "next/image";
import Link from "next/link";

const PUBLIC_NAV_GROUPS = [
  { label: "Domů", href: "/", match: ["/"], items: [] },
  { label: "Objevuj", href: "/jak-to-funguje", match: ["/jak-to-funguje", "/o-nas", "/vize", "/16-oblasti", "/7-cest", "/knihovna", "/blog", "/impact"], items: [["/o-nas", "O Pansofii"], ["/jak-to-funguje", "Jak to funguje"], ["/16-oblasti", "16 oblastí"], ["/7-cest", "7 cest"], ["/vize", "Vize"], ["/knihovna", "Knihovna"], ["/blog", "Blog"], ["/impact", "Dopad"]] },
  { label: "Projekty", href: "/projekty", match: ["/projekty", "/green-hope", "/urban-family-farm", "/family-team", "/digitalni-kompost", "/mapa-kolobehu", "/mapa"], items: [["/green-hope", "Green Hope"], ["/urban-family-farm", "Urban Family Farm"], ["/family-team", "Family Team"], ["/digitalni-kompost", "Materiály v oběhu"], ["/mapa-kolobehu", "Mapa koloběhu"], ["/mapa", "Mapa míst"]] },
  { label: "Komunita", href: "/sit", match: ["/sit", "/instituce", "/osobni-rust"], items: [["/sit", "Síť a komunita"], ["/instituce", "Instituce"], ["/osobni-rust", "Knowledge Exchange"]] },
  { label: "Zapoj se", href: "/pro-koho", match: ["/pro-koho", "/pro-skoly", "/pro-organizace", "/kontakt"], items: [["/pro-skoly", "Pro školy"], ["/pro-organizace", "Pro organizace"], ["/kontakt", "Kontakt"]] },
];

const FOOTER_GROUPS = [
  ["Poznat Pansofii", [["/jak-to-funguje", "Jak to funguje"], ["/16-oblasti", "16 oblastí"], ["/7-cest", "7 cest"], ["/vize", "Vize"], ["/knihovna", "Knihovna"], ["/blog", "Blog"]]],
  ["Praxe a projekty", [["/projekty", "Projekty"], ["/green-hope", "Green Hope"], ["/urban-family-farm", "Urban Family Farm"], ["/family-team", "Family Team"], ["/digitalni-kompost", "Materiály v oběhu"], ["/mapa-kolobehu", "Mapa koloběhu"], ["/mapa", "Mapa"]]],
  ["Lidé a organizace", [["/pro-koho", "Pro koho"], ["/pro-skoly", "Pro školy"], ["/pro-organizace", "Pro organizace"], ["/instituce", "Instituce"], ["/sit", "Síť a komunita"], ["/osobni-rust", "Knowledge Exchange"], ["/kontakt", "Kontakt"]]],
  ["Důvěra a informace", [["/o-nas", "O nás"], ["/impact", "Dopad"], ["/soukromi", "Soukromí"], ["/podminky", "Podmínky"], ["/cookies", "Cookies"], ["/pravidla-komunity", "Pravidla komunity"], ["/pristupnost", "Přístupnost"], ["/bezpecnost", "Bezpečnost"]]],
];

function groupIsActive(group, active, current) {
  return group.match.includes(current) || group.match.includes(active);
}

export function PublicShell({ children, active = "", current = active }) {
  return <div className="pw-site">
    <a className="skip-link" href="#obsah">Přejít na obsah</a>
    <header className="pw-header">
      <div className="pw-header__inner">
        <Link className="pw-brand" href="/" aria-label="Pansofie, úvodní stránka">
          <span className="pw-brand__mark" aria-hidden="true"><Image src="/assets/brand/shared/domains/domain-nature.svg" alt="" width={20} height={20}/></span>
          <span><strong>Pansofie</strong><small>Lidé · vědění · kontext · změna</small></span>
        </Link>
        <nav className="pw-nav" aria-label="Hlavní navigace">
          {PUBLIC_NAV_GROUPS.map((group) => <div key={group.label} className={`pw-nav-group${groupIsActive(group, active, current) ? " is-active" : ""}`}>
            <Link className="pw-nav-group__link" aria-current={current === group.href ? "page" : undefined} href={group.href}>{group.label}</Link>
            {group.items.length > 0 && <div className="pw-nav-panel">
              <span className="pw-nav-panel__eyebrow">{group.label}</span>
              {group.items.map(([href, label]) => <Link key={href} aria-current={current === href ? "page" : undefined} href={href}>{label}</Link>)}
            </div>}
          </div>)}
        </nav>
        <nav className="pw-actions" aria-label="Produkty a účet">
          <Link className={`pw-link-muted${active === "/young" ? " is-active" : ""}`} aria-current={current === "/young" ? "page" : undefined} href="/young">Young</Link>
          <Link className={`pw-go-launch${active === "/pansofie-go" ? " is-active" : ""}`} aria-current={current === "/pansofie-go" ? "page" : undefined} href="/pansofie-go"><span>Pansofie GO</span><small>Geolokační hra</small></Link>
          <Link className="pw-login" href="/login">Přihlásit se</Link>
        </nav>
        <details className="pw-menu">
          <summary aria-label="Otevřít navigaci">Menu</summary>
          <nav aria-label="Mobilní navigace">
            {PUBLIC_NAV_GROUPS.map((group) => <div className="pw-menu__group" key={group.label}>
              <Link className="pw-menu__group-title" aria-current={current === group.href ? "page" : undefined} href={group.href}>{group.label}</Link>
              {group.items.map(([href, label]) => <Link key={href} aria-current={current === href ? "page" : undefined} href={href}>{label}</Link>)}
            </div>)}
            <div className="pw-menu__products">
              <Link aria-current={current === "/young" ? "page" : undefined} href="/young">Pansofie Young</Link>
              <Link className="pw-menu__go" aria-current={current === "/pansofie-go" ? "page" : undefined} href="/pansofie-go"><span>Pansofie GO</span><small>Geolokační hra</small></Link>
              <Link href="/login">Přihlásit se</Link>
            </div>
          </nav>
        </details>
      </div>
    </header>
    <main id="obsah">{children}</main>
    <footer className="pw-footer">
      <div className="pw-footer__top">
        <div className="pw-footer__statement">
          <strong>Pansofie</strong>
          <p>Učit se životem, tvořit společně a měnit svět malými konkrétními činy.</p>
        </div>
        <nav className="pw-footer__products" aria-label="Produkty Pansofie">
          <Link aria-current={current === "/young" ? "page" : undefined} href="/young"><span>Pro mladé</span><b>Pansofie Young</b></Link>
          <Link aria-current={current === "/pansofie-go" ? "page" : undefined} href="/pansofie-go"><span>Od poznání k činu</span><b>Pansofie GO</b></Link>
        </nav>
      </div>
      <div className="pw-footer__nav" aria-label="Mapa veřejné Pansofie">
        {FOOTER_GROUPS.map(([group, links]) => <nav key={group} aria-label={group}>
          <strong>{group}</strong>
          {links.map(([href, label]) => <Link key={href} aria-current={current === href ? "page" : undefined} href={href}>{label}</Link>)}
        </nav>)}
      </div>
      <div className="pw-footer__bottom"><span>© Pansofie</span><span>Veřejná Pansofie · poznání, praxe a souvislosti</span></div>
    </footer>
  </div>;
}
