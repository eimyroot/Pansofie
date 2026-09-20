import Link from "next/link";

export default function TeensShell({ name, presentation, children }) {
  return (
    <div className="teens-shell" data-experience="young_teens" data-young-mode={presentation?.id || "impact"}>
      <header className="teens-nav-wrap">
        <nav className="teens-nav" aria-label="Navigace přihlášené Pansofie Young">
          <Link href="/young/teens" className="young-logo-mark"><span>YOUNG</span> PANSOFIE</Link>
          <div className="teens-nav-links">
            <Link href="/young/teens">Můj prostor</Link>
            <Link href="/young/jak-to-funguje">Jak to funguje</Link>
            <Link href="/bezpecnost">Bezpečí</Link>
            <Link href="/">Hlavní Pansofie</Link>
          </div>
          <div className="young-nav-actions">
            <span className="young-account-name">{presentation?.label || "Impact"} · {name || "Můj prostor"}</span>
            <Link href="/young" className="young-nav-cta">Veřejný Young <span>↗</span></Link>
          </div>
          <details className="young-mobile-menu">
            <summary aria-label="Otevřít menu">☰</summary>
            <div>
              <Link href="/young/teens">Můj prostor</Link>
              <Link href="/young/jak-to-funguje">Jak to funguje</Link>
              <Link href="/bezpecnost">Bezpečí</Link>
              <Link href="/">Hlavní Pansofie</Link>
            </div>
          </details>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="teens-footer">
        <div className="teens-footer-brand"><strong><span>YOUNG</span> PANSOFIE</strong><small>{presentation?.ageLabel || "14–20 let"} · projekty, zkušenosti a vlastní směr</small></div>
        <nav aria-label="Patička Young Teens">
          <Link href="/young">O Young</Link>
          <Link href="/pravidla-komunity">Pravidla komunity</Link>
          <Link href="/soukromi">Soukromí</Link>
          <Link href="/">Pansofie</Link>
        </nav>
        <div className="teens-footer-note">Doložená zkušenost ano. Veřejné skóre člověka ne.</div>
      </footer>
    </div>
  );
}
