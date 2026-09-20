"use client";

import { useState } from "react";

export function ContactForm() {
  const [prepared, setPrepared] = useState(false);

  function submit(event) {
    event.preventDefault();
    setPrepared(true);
  }

  if (prepared) return <div className="pw-contact-state" role="status">
    <p className="pw-eyebrow">LOKÁLNÍ PROTOTYP</p>
    <h2>Zpráva je připravená, ale nebyla odeslána.</h2>
    <p>Kontaktní backend zatím není připojený. Pansofie proto netvrdí, že zprávu někdo obdržel. Před odchodem ze stránky si text zkopírujte.</p>
    <button className="pw-button pw-button--light" type="button" onClick={() => setPrepared(false)}>Zpět k formuláři</button>
  </div>;

  return <form className="pw-contact-form" onSubmit={submit}>
    <label><span>Čeho se zpráva týká?</span><select required defaultValue=""><option value="" disabled>Vyberte téma</option><option>Obecný dotaz</option><option>Spolupráce</option><option>Pro školy</option><option>Přístupnost</option><option>Bezpečnostní podnět</option></select></label>
    <label><span>E-mail pro odpověď</span><input type="email" required autoComplete="email"/></label>
    <label><span>Zpráva</span><textarea rows="8" required minLength={10}/></label>
    <label className="pw-contact-check"><input type="checkbox" required/><span>Rozumím, že formulář je zatím lokální prototyp a zprávu neodesílá.</span></label>
    <button className="pw-button pw-button--dark" type="submit">Připravit zprávu</button>
  </form>;
}
