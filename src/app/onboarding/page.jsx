import Link from "next/link";
import { completeOnboarding } from "./actions";

export const metadata = { title: "První nastavení", robots: { index: false, follow: false } };

export default async function OnboardingPage({ searchParams }) {
  const params = await searchParams;
  const choices = [["personal","Pro sebe"],["family","Rodina"],["school","Škola"],["company","Firma"],["young","Pansofie Young"]];
  const next = typeof params?.next === "string" ? params.next : "";
  const invitedToSchool = params?.invited === "1" && next.startsWith("/go/school");
  return <main className="auth-page auth-page--onboarding">
    <aside className="auth-visual auth-visual--onboarding" aria-label="Pansofie se přizpůsobuje věku, roli a kontextu"><div><span>PRVNÍ NASTAVENÍ</span><h2>Stejné jádro. Jiný vstup podle života.</h2><p>Osobní, rodinný, školní, firemní nebo Young kontext mění zkušenost, ne hodnotu člověka.</p></div></aside>
    <section className="auth-card onboarding-card">
      <Link className="auth-back" href="/">← Zpět na Pansofii</Link><p className="eyebrow">První krok</p><h1>{invitedToSchool ? "Dokončete školní profil" : "Jak chcete Pansofii používat?"}</h1>{params?.error ? <p className="auth-error" role="alert">{params.error}</p> : null}
      {invitedToSchool ? <p className="form-note" role="status">Školní pozvánka je přijatá. Doplňte profil a pokračujte rovnou do School GO.</p> : null}
      <form action={completeOnboarding}><input type="hidden" name="next" value={next} /><label>Jak vám máme říkat?<input name="display_name" required maxLength={80} /></label>
        <fieldset><legend>Vyberte svůj prostor</legend>{choices.map(([value,label]) => <label className="choice" key={value}><input type="radio" name="intent" value={value} required defaultChecked={invitedToSchool && value === "school"} />{label}</label>)}</fieldset>
        <label>Název rodiny, školy nebo firmy (volitelné)<input name="space_name" maxLength={120} /></label>
        <label>Datum narození (povinné pro Young)<input name="date_of_birth" type="date" /></label>
        <p className="form-note">Věk určuje pouze vhodný vzhled. Přístup k datům vždy řídí členství a oprávnění.</p><button type="submit">Pokračovat</button>
      </form>
    </section>
  </main>;
}
