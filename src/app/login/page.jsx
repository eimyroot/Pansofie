import Link from "next/link";
import { login, signup } from "./actions";

export const metadata = { title: "Přihlášení", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return <main className="auth-page auth-page--login">
    <aside className="auth-visual" aria-label="Pansofie propojuje poznání se skutečným světem"><div><span>PANSOFIE ID</span><h2>Jeden vstup. Různé zkušenosti.</h2><p>MAIN pro porozumění, GO pro akci a Young pro mladé. Účet drží identitu a bezpečný kontext.</p></div></aside>
    <section className="auth-card">
      <Link className="auth-back" href="/">← Zpět na Pansofii</Link><p className="eyebrow">Pansofie ID</p><h1>Vstup do vašeho prostoru</h1><p>Přihlaste se, nebo si vytvořte nový účet.</p>
      {params?.error ? <p className="auth-error" role="alert">{params.error}</p> : null}
      <form><input type="hidden" name="next" value={typeof params?.next === "string" ? params.next : ""} /><label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
        <label>Heslo<input name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
        <div className="auth-actions"><button formAction={login}>Přihlásit se</button><button formAction={signup} className="secondary">Vytvořit účet</button></div>
      </form>
      <small className="auth-trust">Po přihlášení se zobrazí zkušenost podle věku a kontextu. Oprávnění řídí účet, členství a ověřené vztahy.</small>
    </section>
  </main>;
}
