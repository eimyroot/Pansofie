"use client";

export default function Error({ reset }) {
  return <main className="auth-page" role="alert"><section className="auth-card"><p className="eyebrow">Něco se nepodařilo</p><h1>Váš prostor teď nejde načíst.</h1><p className="form-note">Zkuste stránku obnovit. Pokud problém trvá, bezpečně zůstává zachované přihlášení i oprávnění.</p><button onClick={reset}>Zkusit znovu</button></section></main>;
}
