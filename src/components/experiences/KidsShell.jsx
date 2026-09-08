import Link from "next/link";

export default function KidsShell({ name, children }) {
  return (
    <div className="kids-shell" data-experience="young_kids">
      <header className="kids-nav-wrap">
        <nav className="kids-nav" aria-label="Navigace Pansofie Young 6–13">
          <Link href="/young/kids" className="young-logo-mark"><span>YOUNG</span> PANSOFIE</Link>
          <div className="kids-nav-links">
            <Link href="/young/kids">Domů</Link>
            <Link href="/young/kids#objevuj">Objevuj</Link>
            <Link href="/young/kids#vyzkousej">Hraj si</Link>
            <Link href="/young/kids#tvor">Tvoř</Link>
            <Link href="/young/kids#komunita">Komunita</Link>
            <Link href="/young">O nás</Link>
          </div>
          <div className="young-nav-actions">
            <span className="young-account-name">{name || "Můj svět"}</span>
            <Link href="/app" className="young-nav-cta">Začni <span>→</span></Link>
          </div>
          <details className="young-mobile-menu">
            <summary aria-label="Otevřít menu">☰</summary>
            <div>
              <Link href="/young/kids">Domů</Link><Link href="/young/kids#objevuj">Objevuj</Link><Link href="/young/kids#vyzkousej">Hraj si</Link><Link href="/young/kids#tvor">Tvoř</Link><Link href="/young/kids#komunita">Komunita</Link><Link href="/">Hlavní Pansofie</Link>
            </div>
          </details>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="kids-footer">
        <div className="kids-footer-brand"><strong><span>YOUNG</span> PANSOFIE</strong><small>Zvídavé děti pro svět, který dává smysl.</small></div>
        <nav aria-label="Patička Young Kids"><Link href="/young">O nás</Link><Link href="/young/kids#objevuj">Témata</Link><Link href="/app/school">Pro školy</Link><Link href="/">Hlavní Pansofie</Link></nav>
        <div className="kids-footer-note">Větší souvislosti. Lepší budoucnost. Už teď.</div>
      </footer>
    </div>
  );
}
