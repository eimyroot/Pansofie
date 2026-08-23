# PANSOFIE R14 — Participation email templates

These templates deliberately separate **interest/intake confirmation** from **account activation**. An intake submission must never claim that an account, workshop, consultation or profile exists unless that state is real.

## 1. School intake confirmation — send after a successful `audience_intakes` insert

**Subject:** Pansofie — děkujeme za váš zájem a posíláme první ukázkovou lekci

Dobrý den, {{full_name}},

 děkujeme, že jste nám popsali, co ve škole právě řešíte a které pansofické pilíře chcete se žáky rozvíjet.

Vaše školní přihláška do pilotního rozhovoru byla přijata. **Tímto ještě nevznikl uživatelský účet ani potvrzené místo v pilotu.** Nejprve ověříme, zda umíme vaši potřebu smysluplně a bezpečně pokrýt.

Jako první praktický krok si můžete stáhnout ukázkovou lekci zaměřenou na kritické myšlení a práci s důkazy:

`https://pansofie-staging.vercel.app/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md`

Pokud bude dávat další spolupráce smysl, ozveme se s konkrétním dalším krokem.

S pozdravem  
Tým Pansofie

---

## 2. School account activation — send only after an invited account really exists

**Subject:** Vítejte v Pansofii — váš pilotní účet je aktivní

Dobrý den, {{full_name}},

váš pozvaný pilotní účet v Pansofii byl aktivován.

Přihlásit se můžete zde:

`https://pansofie-staging.vercel.app/login`

Po přihlášení se otevře role-aware nástěnka. Zobrazené stavy vycházejí ze skutečných oprávnění, školních Experiences a review workflow; nevytváříme syntetický pokrok jen proto, aby dashboard vypadal zaplněně.

Ukázkovou lekci kritického myšlení najdete také zde:

`https://pansofie-staging.vercel.app/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md`

S pozdravem  
Tým Pansofie

---

## 3. Company / partner intake confirmation — send after a successful `audience_intakes` insert

**Subject:** Pansofie — potvrzení partnerského zájmu

Dobrý den, {{full_name}},

 děkujeme za váš zájem propojit {{organization_name}} s Pansofií.

Vaši výzvu jsme přijali k posouzení. **Odesláním formuláře nevznikl účet, objednávka workshopu, termín konzultace ani certifikace.** Nejprve ověříme, zda je možné z vašeho zadání vytvořit smysluplnou a bezpečně ohraničenou Challenge nebo jiný další krok.

Mezitím můžete použít pracovní materiály:

- Restart pozornosti: `https://pansofie-staging.vercel.app/materials/pansofie-restart-pozornosti-team-guide.md`
- Etický kompas AI: `https://pansofie-staging.vercel.app/materials/pansofie-eticky-kompas-ai-checklist.md`
- Materiálový most: `https://pansofie-staging.vercel.app/materialovy-most`

Pokud další spolupráce projde úvodním review, ozveme se s konkrétním návrhem postupu.

S pozdravem  
Tým Pansofie

---

## 4. Partner account activation — send only after the account + partner membership really exist

**Subject:** Vítejte v Pansofii — váš partnerský přístup je aktivní

Dobrý den, {{full_name}},

váš pozvaný účet a odpovídající partnerská role pro organizaci {{organization_name}} jsou nyní aktivní.

Přihlásit se můžete zde:

`https://pansofie-staging.vercel.app/login`

Po přihlášení se otevře nástěnka podle skutečných oprávnění. Partner workspace vede reálnou Challenge přes verification, Quality Gate a managed match; registrace ani finanční podpora samy o sobě nezajišťují přístup k dětem ani pozitivní výsledek.

S pozdravem  
Tým Pansofie

---

## Delivery boundary

R14 stores the copy contract only. Sending must be activated only after a real mail provider / transactional email function is configured with server-side credentials. The browser must never contain a privileged mail API key. A successful UI submission is not evidence that an email was sent.
