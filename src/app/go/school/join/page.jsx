import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../lib/supabase/server";
import { acceptSchoolInviteAction } from "./actions";

export const metadata = {
  title: "Přijetí školní pozvánky",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

const INVITE_TOKEN_RE = /^[0-9a-f]{48}$/i;

export default async function SchoolInviteJoinPage({ searchParams }) {
  const params = await searchParams;
  const token = String(params?.token || "").trim().toLowerCase();
  const error = typeof params?.error === "string" ? params.error : "";

  if (!INVITE_TOKEN_RE.test(token)) {
    return <main className="auth-page"><section className="auth-card"><p className="eyebrow">PANSOFIE GO · ŠKOLA</p><h1>Pozvánka není platná.</h1><p>Požádejte školu o nový jednorázový odkaz.</p><Link href="/">Zpět na Pansofii</Link></section></main>;
  }

  const supabase = await createClient();
  const { data, error: authError } = supabase ? await supabase.auth.getClaims() : { data: null, error: true };
  if (authError || !data?.claims?.sub) {
    redirect(`/login?next=${encodeURIComponent(`/go/school/join?token=${token}`)}`);
  }

  return <main className="auth-page auth-page--onboarding">
    <aside className="auth-visual auth-visual--onboarding" aria-label="Bezpečné přijetí do školního prostoru"><div><span>PANSOFIE GO · ŠKOLA</span><h2>Jedna identita. Jedno školní členství.</h2><p>Pozvánka přidá váš existující Pansofie účet do konkrétní třídy. Nevytváří druhý studentský účet.</p></div></aside>
    <section className="auth-card onboarding-card">
      <p className="eyebrow">Školní pozvánka</p>
      <h1>Připojit se ke třídě</h1>
      <p>Odkaz je jednorázový a časově omezený. Po přijetí uvidíte jen svůj školní kontext a vlastní zadání.</p>
      {error ? <p className="auth-error" role="alert">{error}</p> : null}
      <form action={acceptSchoolInviteAction}>
        <input type="hidden" name="token" value={token} />
        <button type="submit">Přijmout pozvánku</button>
      </form>
      <small className="auth-trust">Přijetím pozvánky nevzniká veřejný profil, žebříček ani přístup k ostatním studentům.</small>
    </section>
  </main>;
}
