"use client";

import { useState } from "react";
import { askSchoolQuestMentorAction } from "../../app/go/school/quest-actions";

const SUGGESTIONS = [
  "Polož mi jednu otázku, která mi pomůže začít.",
  "Co mám v tomhle kroku ověřit jako první?",
  "Jak poznám, že jsem něco důležitého nepřehlédl/a?",
];

export default function SchoolQuestMentor({ quest, phase }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const providerAvailable = Boolean(quest.mentor?.providerAvailable);

  const ask = async (event) => {
    event.preventDefault();
    const text = question.trim();
    if (!text || busy) return;
    setBusy(true);
    setStatus("");
    try {
      const result = await askSchoolQuestMentorAction({
        assignmentId: quest.assignment.id,
        phaseId: phase.id,
        question: text,
      });
      if (result.mode !== "account") {
        setStatus(result.message || "Průvodce teď není dostupný.");
        return;
      }
      setMessages((current) => [
        ...current,
        { role: "student", text },
        { role: "mentor", text: result.answer },
      ].slice(-6));
      setQuestion("");
      setStatus(result.source === "provider"
        ? "Odpověď využila AI rozšíření. Historie zůstává jen v této otevřené obrazovce."
        : "Mentor Lite pomohl bez externí AI. Historie zůstává jen v této otevřené obrazovce.");
    } catch {
      setStatus("Průvodce teď neodpovídá. Zkus to později.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="goq-mentor" aria-labelledby="quest-mentor-heading">
      <div className="goq-mentor-head">
        <span className="goq-mentor-mark" aria-hidden="true">?</span>
        <div>
          <small>SOKRATOVSKÝ PRŮVODCE</small>
          <h3 id="quest-mentor-heading">Pomůže otázkou. Neudělá úkol za tebe.</h3>
        </div>
      </div>
      <p className="goq-mentor-privacy">
        Mentor Lite funguje i bez externí AI. Pokud provozovatel zapne AI rozšíření, poskytovateli se odešle jen text otázky,
        název mise a právě otevřený krok. Z účtu mu nepřidáváme jméno, třídu, soukromé poznámky ani portfolio.
      </p>
      <div className="goq-mentor-offline" role="status">
        <b>{providerAvailable ? "Mentor Lite + AI rozšíření" : "Mentor Lite je aktivní"}</b>
        <span>{providerAvailable
          ? "Když externí AI selže nebo narazí na limit, průvodce automaticky pokračuje bezpečnou Lite nápovědou."
          : "Funguje bez externího API. Připojení AI lze později zapnout serverovou konfigurací bez změny tohoto rozhraní."}</span>
      </div>
      <div className="goq-mentor-suggestions" aria-label="Návrhy otázek pro průvodce">
        {SUGGESTIONS.map((item) => (
          <button key={item} type="button" onClick={() => setQuestion(item)} disabled={busy}>{item}</button>
        ))}
      </div>
      {messages.length > 0 && (
        <div className="goq-mentor-thread" aria-live="polite">
          {messages.map((item, index) => (
            <article key={`${item.role}-${index}`} className={`is-${item.role}`}>
              <small>{item.role === "mentor" ? "PRŮVODCE" : "TY"}</small>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      )}
      <form className="goq-mentor-form" onSubmit={ask}>
        <label htmlFor="quest-mentor-question">Kde se teď potřebuješ pohnout?</label>
        <textarea
          id="quest-mentor-question"
          rows="3"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={800}
          placeholder="Např. Nevím, jak začít ověřovat tohle tvrzení…"
          disabled={busy}
        />
        <div className="goq-mentor-form-meta">
          <span>{question.length}/800 · historie se po reloadu smaže</span>
          {messages.length > 0 && (
            <button type="button" onClick={() => { setMessages([]); setStatus(""); }}>
              Smazat výměnu
            </button>
          )}
        </div>
        <button type="submit" className="goq-mentor-submit" disabled={busy || !question.trim()}>
          {busy ? "Průvodce přemýšlí…" : "Zeptat se průvodce"}
        </button>
      </form>
      <p className="goq-mentor-boundary">
        Průvodce nenahrazuje učitele, rodiče ani odbornou pomoc. Pansofie tuto výměnu neukládá do portfolia ani databáze.
        Externí poskytovatel se zapojuje jen v explicitně povoleném AI režimu a pod stejnými privacy a budget pravidly.
      </p>
      {status && <p className="goq-mentor-status" role="status">{status}</p>}
    </section>
  );
}
