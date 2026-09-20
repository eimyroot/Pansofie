import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  ["/", "Pansofie"],
  ["/16-oblasti", "16 oblastí"],
  ["/7-cest", "7 cest"],
  ["/projekty", "Projekty"],
  ["/impact", "Dopad"],
  ["/pro-skoly", "Pro školy"],
];

export function PublicShell({ children, active = "" }) {
  return <div className="pw-site">
    <a className="skip-link" href="#obsah">Přejít na obsah</a>
    <header className="pw-header">
      <div className="pw-header__inner">
        <Link className="pw-brand" href="/" aria-label="Pansofie, úvodní stránka">
          <span className="pw-brand__mark" aria-hidden="true"><Image src="/assets/brand/shared/domains/domain-nature.svg" alt="" width={20} height={20}/></span>
          <span><strong>Pansofie</strong><small>Všechno souvisí se vším</small></span>
        </Link>
        <nav className="pw-nav" aria-label="Hlavní navigace">
          {NAV_ITEMS.map(([href, label]) => <Link key={href} className={active === href ? "is-active" : ""} href={href}>{label}</Link>)}
        </nav>
        <div className="pw-actions">
          <Link className="pw-link-muted" href="/young">Young</Link>
          <Link className="pw-link-muted" href="/pansofie-go">GO</Link>
          <Link className="pw-login" href="/login">Přihlásit se</Link>
        </div>
        <details className="pw-menu">
          <summary aria-label="Otevřít navigaci">Menu</summary>
          <nav aria-label="Mobilní navigace">
            {NAV_ITEMS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/young">Pansofie Young</Link>
            <Link href="/pansofie-go">Pansofie GO</Link>
            <Link href="/login">Přihlásit se</Link>
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
        <div className="pw-footer__products">
          <Link href="/young"><span>Pro mladé</span><b>Pansofie Young</b></Link>
          <Link href="/pansofie-go"><span>Od poznání k činu</span><b>Pansofie GO</b></Link>
        </div>
      </div>
      <div className="pw-footer__bottom">
        <span>© Pansofie</span>
        <nav aria-label="Doplňující informace">
          <Link href="/o-nas">O nás</Link>
          <Link href="/vize">Vize</Link>
          <Link href="/pro-koho">Pro koho</Link>
          <Link href="/jak-to-funguje">Jak to funguje</Link>
          <Link href="/knihovna">Knihovna</Link>
          <Link href="/sit">Síť</Link>
          <Link href="/mapa">Mapa</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/pro-organizace">Pro organizace</Link>
          <Link href="/soukromi">Soukromí</Link>
          <Link href="/podminky">Podmínky</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/pravidla-komunity">Pravidla komunity</Link>
          <Link href="/pristupnost">Přístupnost</Link>
          <Link href="/bezpecnost">Bezpečnost</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>
      </div>
    </footer>
  </div>;
}
