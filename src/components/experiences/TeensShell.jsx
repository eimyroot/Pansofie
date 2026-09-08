import Link from "next/link";

export default function TeensShell({ name, children }) {
  return (
    <div className="teens-shell" data-experience="young_teens">
      <header className="teens-nav-wrap">
        <nav className="teens-nav" aria-label="Navigace Pansofie Young 14–20">
          <Link href="/young/teens" className="young-logo-mark"><span>YOUNG</span> PANSOFIE</Link>
          <div className="teens-nav-links">
            <Link href="/young/teens">Domů</Link>
            <Link href="/young/teens#temata">Témata</Link>
            <Link href="/young/teens#clanky">Články</Link>
            <Link href="/young/teens#komunita">Komunita</Link>
            <Link href="/young/teens#projekty">Projekty</Link>
            <Link href="/young">O nás</Link>
          </div>
          <div className="young-nav-actions">
            <span className="young-account-name">{name || "Můj prostor"}</span>
            <Link href="/app" className="young-nav-cta">Přidej se <span>→</span></Link>
          </div>
          <details className="young-mobile-menu">
            <summary aria-label="Otevřít menu">☰</summary>
            <div>
              <Link href="/young/teens">Domů</Link><Link href="/young/teens#temata">Témata</Link><Link href="/young/teens#clanky">Články</Link><Link href="/young/teens#komunita">Komunita</Link><Link href="/young/teens#projekty">Projekty</Link><Link href="/">Hlavní Pansofie</Link>
            </div>
          </details>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="teens-footer">
        <div className="teens-footer-brand"><strong><span>YOUNG</span> PANSOFIE</strong><small>Zvídavé myšlení pro smysluplnější svět.</small></div>
        <nav aria-label="Patička Young Teens"><Link href="/young">O nás</Link><Link href="/young/teens#clanky">Blog</Link><Link href="/app/school">Pro školy</Link><Link href="/">Hlavní Pansofie</Link></nav>
        <div className="teens-footer-note">Stále se ptát. Víc chápat. Spolu.</div>
      </footer>
    </div>
  );
}
