"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Bot,
  Camera,
  CheckCircle2,
  ChevronRight,
  Compass,
  Home,
  Leaf,
  Map as MapIcon,
  MapPin,
  Recycle,
  Send,
  Sparkles,
  Sprout,
  Target,
  Users,
} from "lucide-react";
import styles from "./go.module.css";

const NAV = [
  { id: "home", label: "Domů", icon: Home },
  { id: "missions", label: "Mise", icon: Target },
  { id: "map", label: "Mapa", icon: MapIcon },
  { id: "farm", label: "Farma", icon: Sprout },
  { id: "mentor", label: "Mentor", icon: Bot },
];

const CHECKPOINTS = [
  {
    name: "Komunitní kompostér",
    distance: "150 m",
    text: "Green Hope projekt na náměstí Míru.",
    tone: "green",
    badge: "Nové",
  },
  {
    name: "Školní skleník",
    distance: "400 m",
    text: "Urban Farm s veřejným přístupem.",
    tone: "orange",
  },
  {
    name: "Re-use dílna",
    distance: "850 m",
    text: "Opravárenský workshop a knihovna věcí.",
    tone: "violet",
  },
];

const MISSIONS = [
  {
    category: "GREEN HOPE · EKOLOGIE",
    title: "Cesta našeho jídla",
    text: "Zjisti, odkud pochází potraviny ve tvém supermarketu a navrhni lepší lokální alternativu.",
    xp: "+150 XP",
    meta: "Fáze: DO (Průzkum)",
    progress: "2/6 kroků",
    tone: "green",
  },
  {
    category: "PANSOFIE · MEZIGENERACE",
    title: "Znalosti výměnou",
    text: "Nauč prarodiče používat novou aplikaci a na oplátku se nauč jedno řemeslo nebo recept.",
    xp: "+200 XP",
    meta: "Připraveno",
    progress: "",
    tone: "violet",
  },
  {
    category: "RODINA · KOMUNITA",
    title: "Sousedská mikro-výzva",
    text: "Najděte jeden malý problém ve svém okolí a společně ho během týdne zlepšete.",
    xp: "+180 XP",
    meta: "Nová mise",
    progress: "",
    tone: "orange",
  },
];

export default function GoPage() {
  const [tab, setTab] = useState("home");
  const [filter, setFilter] = useState("Vše");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ahoj rodino! 👋 Vidím, že jste včera úspěšně zasadili ředkvičky na vaší Urban Farm. Už jste přemýšleli, komu je po sklizni prodáte nebo darujete?",
    },
  ]);
  const [input, setInput] = useState("");

  const filteredMissions = useMemo(() => {
    if (filter === "Vše") return MISSIONS;
    const needle = filter.toLowerCase();
    return MISSIONS.filter((mission) =>
      `${mission.category} ${mission.title}`.toLowerCase().includes(needle)
    );
  }, [filter]);

  function sendMessage(event) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: value },
      {
        role: "assistant",
        text: "To je dobrý směr. Zkusme z toho udělat jeden malý krok, který zvládnete dnes. Co je nejjednodušší věc, kterou můžete ověřit přímo na místě?",
      },
    ]);
    setInput("");
  }

  return (
    <main className={styles.stage}>
      <section className={styles.phone} aria-label="PansofieGO prototyp">
        <header className={styles.topbar}>
          <div className={styles.identity}>
            <div className={styles.avatar}>N</div>
            <div>
              <div className={styles.family}>Novákovi</div>
              <div className={styles.level}>Úroveň 4 · 1250 XP</div>
            </div>
          </div>
          <Bell size={17} strokeWidth={1.9} className={styles.bell} />
        </header>

        <div className={styles.progressRow}>
          <span>Postup na úroveň 5</span>
          <span>1250 / 2000 XP</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} />
        </div>

        <div className={styles.viewport}>
          {tab === "home" && <HomeScreen setTab={setTab} />}
          {tab === "missions" && (
            <MissionsScreen
              filter={filter}
              setFilter={setFilter}
              missions={filteredMissions}
            />
          )}
          {tab === "map" && <MapScreen />}
          {tab === "farm" && <FarmScreen />}
          {tab === "mentor" && (
            <MentorScreen
              messages={messages}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
            />
          )}
        </div>

        <nav className={styles.nav} aria-label="PansofieGO navigace">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`${styles.navItem} ${active ? styles.navActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={active ? 2.35 : 1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </section>
    </main>
  );
}

function HomeScreen({ setTab }) {
  return (
    <div className={styles.screen}>
      <section className={styles.sectionHead}>
        <h1>Dobrý den, rodino!</h1>
        <p>Co dnes vytvoříme pro lepší svět?</p>
      </section>

      <article className={styles.challenge}>
        <span className={styles.challengeLabel}>RODINNÁ VÝZVA</span>
        <h2>Založte minizahrádku</h2>
        <p>Pojďte společně zasadit první microgreens na okně. Mise spojuje celou rodinu!</p>
        <button type="button" onClick={() => setTab("missions")}>
          Začít misi (+150 XP)
        </button>
        <div className={styles.challengeOrb} />
      </article>

      <div className={styles.impactTitle}>
        <Sparkles size={15} />
        <span>Pansofie Impact Index</span>
      </div>

      <article className={styles.impactCard}>
        <div className={styles.scoreCircle}>
          <strong>68</strong>
          <span>SKÓRE</span>
        </div>
        <div className={styles.impactStats}>
          <span><i className={styles.dotGreen} /> Ekologie: <strong>Lvl 3</strong></span>
          <span><i className={styles.dotBlue} /> Znalosti: <strong>Lvl 4</strong></span>
          <span><i className={styles.dotOrange} /> Farmář: <strong>Lvl 2</strong></span>
          <span><i className={styles.dotViolet} /> Tvorba: <strong>Lvl 3</strong></span>
        </div>
      </article>

      <div className={styles.quickGrid}>
        <button type="button" className={`${styles.quickCard} ${styles.quickOrange}`} onClick={() => setTab("farm")}>
          <Sprout size={20} />
          <span>Naše Farma</span>
        </button>
        <button type="button" className={`${styles.quickCard} ${styles.quickMint}`} onClick={() => setTab("map")}>
          <Compass size={20} />
          <span>Průzkum</span>
        </button>
      </div>

      <WorldPreview setTab={setTab} />
      <CheckpointList limit={2} />
      <MentorPreview setTab={setTab} />
    </div>
  );
}

function MissionsScreen({ filter, setFilter, missions }) {
  const filters = ["Vše", "Green Hope", "Finance", "Rodina"];
  return (
    <div className={styles.screen}>
      <section className={styles.sectionHeadRow}>
        <div>
          <h1>Mise a výzvy</h1>
          <p>Spojujeme hru s reálným světem.</p>
        </div>
        <span className={styles.streak}>🔥 Série 3 dny</span>
      </section>

      <div className={styles.filters}>
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? styles.filterActive : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.missionStack}>
        {missions.map((mission) => (
          <article key={mission.title} className={styles.missionCard}>
            <div className={styles.missionTop}>
              <span className={`${styles.tag} ${styles[`tag_${mission.tone}`]}`}>{mission.category}</span>
              <strong>{mission.xp}</strong>
            </div>
            <h2>{mission.title}</h2>
            <p>{mission.text}</p>
            <div className={styles.missionBottom}>
              <span>{mission.meta}</span>
              <span>{mission.progress}</span>
            </div>
            {mission.progress === "" && (
              <button className={styles.secondaryButton} type="button">Přijmout misi</button>
            )}
          </article>
        ))}
      </div>

      <WorldPreview />
      <CheckpointList limit={2} />
      <MentorPreview />
    </div>
  );
}

function MapScreen() {
  return (
    <div className={styles.screen}>
      <section className={styles.sectionHead}>
        <h1>Objevuj svět</h1>
        <p>Najdi reálné projekty ve svém okolí.</p>
      </section>
      <WorldPreview large />
      <div className={styles.mapLegend}>
        <span><i className={styles.pinGreen} /> Ekologie</span>
        <span><i className={styles.pinOrange} /> Farma</span>
        <span><i className={styles.pinViolet} /> Komunita</span>
      </div>
      <CheckpointList limit={3} />
      <MentorPreview />
    </div>
  );
}

function FarmScreen() {
  return (
    <div className={styles.screen}>
      <section className={styles.sectionHeadRow}>
        <div>
          <h1>Urban Farm</h1>
          <p>Naše domácí laboratoř života.</p>
        </div>
        <div className={styles.roundIcon}><Sprout size={18} /></div>
      </section>

      <div className={styles.metrics}>
        <div><span>Investováno</span><strong>120 Kč</strong></div>
        <div><span>Očekávaný zisk</span><strong className={styles.money}>350 Kč</strong></div>
      </div>

      <h3 className={styles.kicker}>Aktivní pěstování</h3>
      <article className={styles.cropCard}>
        <div className={styles.cropVisual}><Leaf size={38} /></div>
        <div className={styles.cropBody}>
          <div className={styles.cropTitleRow}>
            <strong>Ředkvičkové microgreens</strong>
            <span>Den 4/10</span>
          </div>
          <p>Lokální produkce na parapetu kuchyně.<br />Odpovědní: Dítě & Rodič.</p>
          <div className={styles.taskDone}><CheckCircle2 size={14} /> Zasít semínka</div>
          <div className={styles.task}><span /> Zalít a změřit pH (Biologie)</div>
          <button type="button" className={styles.photoButton}><Camera size={15} /> Vyfotit pro analýzu růstu</button>
        </div>
      </article>

      <WorldPreview />
      <CheckpointList limit={2} />
      <MentorPreview />
    </div>
  );
}

function MentorScreen({ messages, input, setInput, sendMessage }) {
  return (
    <div className={`${styles.screen} ${styles.mentorScreen}`}>
      <section className={styles.mentorHeader}>
        <div className={styles.botBadge}><Bot size={19} /></div>
        <div>
          <h1>Sokrates <span>(AI Mentor)</span></h1>
          <p>Připraven pomáhat tvořit</p>
        </div>
      </section>

      <div className={styles.chatDay}>Dnes, 10:42</div>
      <div className={styles.chat}>
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`${styles.chatRow} ${message.role === "user" ? styles.chatRowUser : ""}`}
          >
            {message.role === "assistant" && <div className={styles.miniBot}><Bot size={13} /></div>}
            <div className={`${styles.bubble} ${message.role === "user" ? styles.userBubble : ""}`}>{message.text}</div>
          </div>
        ))}
      </div>

      <div className={styles.mentorSuggestions}>
        <button type="button" onClick={() => setInput("Pomoz mi naplánovat dnešní úkol na farmě.")}>Naplánovat dnešní krok</button>
        <button type="button" onClick={() => setInput("Jak můžeme zvýšit náš Impact Index?")}>Zlepšit Impact</button>
      </div>

      <form className={styles.chatForm} onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Zeptej se mentora…"
          aria-label="Zeptej se mentora"
        />
        <button type="submit" aria-label="Odeslat"><Send size={16} /></button>
      </form>
    </div>
  );
}

function WorldPreview({ setTab, large = false }) {
  return (
    <section className={styles.worldBlock}>
      <div className={styles.worldTitle}>
        <h2>Objevuj svět</h2>
        <p>Najdi reálné projekty ve svém okolí.</p>
      </div>
      <button
        type="button"
        className={`${styles.mapCanvas} ${large ? styles.mapLarge : ""}`}
        onClick={() => setTab?.("map")}
        aria-label="Otevřít mapu"
      >
        <span className={`${styles.road} ${styles.roadOne}`} />
        <span className={`${styles.road} ${styles.roadTwo}`} />
        <span className={`${styles.road} ${styles.roadThree}`} />
        <span className={`${styles.mapPin} ${styles.mapPinGreen}`}><Leaf size={13} /></span>
        <span className={`${styles.mapPin} ${styles.mapPinOrange}`}><Sprout size={13} /></span>
        <span className={`${styles.mapPin} ${styles.mapPinViolet}`}><Users size={13} /></span>
        <span className={styles.userDot} />
        <span className={styles.userRange} />
      </button>
    </section>
  );
}

function CheckpointList({ limit }) {
  return (
    <section className={styles.checkpointSection}>
      <h3>NEJBLIŽŠÍ CHECKPOINTY</h3>
      <div className={styles.checkpointStack}>
        {CHECKPOINTS.slice(0, limit).map((item) => (
          <article className={styles.checkpoint} key={item.name}>
            <div className={`${styles.checkIcon} ${styles[`check_${item.tone}`]}`}>
              {item.tone === "green" ? <Recycle size={15} /> : item.tone === "orange" ? <Sprout size={15} /> : <Users size={15} />}
            </div>
            <div className={styles.checkText}>
              <div><strong>{item.name}</strong> <span>{item.distance}</span></div>
              <p>{item.text}</p>
            </div>
            {item.badge ? <span className={styles.newBadge}>{item.badge}</span> : <ChevronRight size={15} className={styles.chevron} />}
          </article>
        ))}
      </div>
    </section>
  );
}

function MentorPreview({ setTab }) {
  return (
    <section className={styles.mentorPreview}>
      <button type="button" className={styles.mentorTop} onClick={() => setTab?.("mentor")}>
        <div className={styles.botBadge}><Bot size={16} /></div>
        <div>
          <strong>Sokrates <span>(AI Mentor)</span></strong>
          <small><i /> Připraven pomáhat tvořit</small>
        </div>
      </button>
      <div className={styles.previewDay}>Dnes, 10:42</div>
      <div className={styles.previewMessage}>
        <div className={styles.miniBot}><Bot size={12} /></div>
        <p>Ahoj rodino! 👋 Vidím, že jste včera úspěšně zasadili ředkvičky na vaší Urban Farm.<br /><br />Už jste přemýšleli, komu je po sklizni prodáte nebo darujete?</p>
      </div>
      <button type="button" className={styles.fakeInput} onClick={() => setTab?.("mentor")}>
        <span>Zeptej se mentora…</span>
        <Send size={14} />
      </button>
    </section>
  );
}
