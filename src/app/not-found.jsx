import Link from "next/link";
import { PublicShell } from "../components/public/PublicShell";

export const metadata = {
  title: "Stránka nenalezena",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <PublicShell>
    <section className="pw-not-found">
      <p className="pw-eyebrow">404 · TADY CESTA NEVEDE</p>
      <h1>Tohle místo v Pansofii zatím není.</h1>
      <p>Adresa může být stará, překlepená nebo už nahrazená novou stránkou. Veřejná Pansofie teď používá jednu App Router vrstvu.</p>
      <div><Link className="pw-button pw-button--dark" href="/">Zpět na Pansofii</Link><Link className="pw-button pw-button--light" href="/16-oblasti">Projít 16 oblastí</Link></div>
    </section>
  </PublicShell>;
}
