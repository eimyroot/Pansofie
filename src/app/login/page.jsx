import { login, signup } from "./actions";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return <main className="auth-page"><section className="auth-card">
    <p className="eyebrow">Pansofie</p><h1>Vstup do vašeho prostoru</h1><p>Přihlaste se, nebo si vytvořte nový účet.</p>
    {params?.error ? <p role="alert">{params.error}</p> : null}
    <form><label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
      <label>Heslo<input name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
      <div className="auth-actions"><button formAction={login}>Přihlásit se</button><button formAction={signup} className="secondary">Vytvořit účet</button></div>
    </form>
  </section></main>;
}
