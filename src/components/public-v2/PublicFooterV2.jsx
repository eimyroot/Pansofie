import Link from "next/link";

const FOOTER_GROUPS = Object.freeze([
  ["Objevuj", [
    ["/o-nas", "O Pansofii"],
    ["/7-cest", "7 cest"],
    ["/16-oblasti", "16 oblastí"],
    ["/jak-to-funguje", "Jak to funguje"],
    ["/blog", "Články"],
  ]],
  ["Praxe", [
    ["/projekty", "Projekty"],
    ["/green-hope", "Green Hope"],
    ["/urban-family-farm", "Urban Family Farm"],
    ["/digitalni-kompost", "Digitální kompost"],
    ["/labs", "Labs"],
  ]],
  ["Lidé", [
    ["/pro-koho", "Pro koho"],
    ["/family-team", "Rodiny"],
    ["/pro-skoly", "Školy"],
    ["/pro-organizace", "Organizace"],
    ["/sit", "Síť"],
  ]],
  ["Důvěra", [
    ["/impact", "Dopad"],
    ["/bezpecnost", "Bezpečnost"],
    ["/soukromi", "Soukromí"],
    ["/pristupnost", "Přístupnost"],
    ["/kontakt", "Kontakt"],
  ]],
]);

export function PublicFooterV2() {
  return <footer className="ps2-footer">
    <div className="ps2-footer__lead">
      <div>
        <p className="ps2-eyebrow">PANSOFIE</p>
        <h2>Rozumět světu. Žít v něm vědoměji. Tvořit ho společně.</h2>
      </div>
      <div className="ps2-footer__products">
        <Link href="/young"><span>Pro mladé</span><strong>Pansofie Young</strong></Link>
        <Link href="/pansofie-go"><span>Od poznání k činu</span><strong>Pansofie GO</strong></Link>
      </div>
    </div>
    <div className="ps2-footer__map">
      {FOOTER_GROUPS.map(([title, links]) => <nav aria-label={title} key={title}>
        <strong>{title}</strong>
        {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>)}
    </div>
    <div className="ps2-footer__bottom">
      <span>© Pansofie</span>
      <span>Poznání · zkušenost · tvorba · komunita · náprava</span>
    </div>
  </footer>;
}
