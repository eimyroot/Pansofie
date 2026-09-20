import Link from "next/link";

export default function KidsShell({ name, presentation, children }) {
  return (
    <div className="kids-shell" data-experience="young_kids" data-young-mode={presentation?.id || "quest"}>
      <header className="kids-nav-wrap">
        <nav className="kids-nav" aria-label="Navigace přihlášené Pansofie Young">
          <Link href="/young/kids" className="young-logo-mark"><span>YOUNG</span> PANSOFIE</Link>
          <div className="kids-nav-links">
            <Link href="/young/kids">Můj prostor</Link>
            <Link href="/young/jak-to-funguje">Jak to funguje</Link>
            <Link href="/bezpecnost">Bezpečí</Link>
            <Link href="/">Hlavní Pansofie</Link>
          </div>
          <div className="young-nav-actions">
            <span className="young-account-name">{presentation?.label || "Young"} · {name || "Můj svět"}</span>
            <Link href="/young" className="young-nav-cta">Veřejný Young <span>↗</span></Link>
          </div>
          <details className="young-mobile-menu">
            <summary aria-label="Otevřít menu">☰</summary>
            <div>
              <Link href="/young/kids">Můj prostor</Link>
              <Link href="/young/jak-to-funguje">Jak to funguje</Link>
              <Link href="/bezpecnost">Bezpečí</Link>
              <Link href="/">Hlavní Pansofie</Link>
            </div>
          </details>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="kids-footer">
        <div className="kids-footer-brand"><strong><span>YOUNG</span> PANSOFIE</strong><small>{presentation?.ageLabel || "6–13 let"} · bezpečný prostor pro zkušenosti</small></div>
        <nav aria-label="Patička Young Kids">
          <Link href="/young">O Young</Link>
          <Link href="/pravidla-komunity">Pravidla komunity</Link>
          <Link href="/soukromi">Soukromí</Link>
          <Link href="/">Pansofie</Link>
        </nav>
        <div className="kids-footer-note">Zkoušet můžeš bez veřejného skóre a bez hledání cizích lidí kolem sebe.</div>
      </footer>
    </div>
  );
}
