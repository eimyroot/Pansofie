import Link from "next/link";

export function GoBridgeV2({ eyebrow = "PANSOFIE GO", title, text, href = "/pansofie-go", label = "Otevřít Pansofie GO" }) {
  return <section className="ps2-go-bridge">
    <div>
      <p className="ps2-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
    <Link className="ps2-button ps2-button--inverse" href={href}>{label}</Link>
  </section>;
}
