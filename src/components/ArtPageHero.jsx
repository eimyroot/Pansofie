import React from "react";

export default function ArtPageHero({ eyebrow, title, accent, lead, art, children }) {
  return <section className="ak-page-hero">
    <div className="ak-page-hero__copy">
      {eyebrow && <span className="ak-eyebrow">{eyebrow}</span>}
      <h1>{title}{accent && <> <em>{accent}</em></>}</h1>
      {lead && <p>{lead}</p>}
      {children}
    </div>
    {art && <div className="ak-page-hero__art" aria-hidden="true"><img src={art} alt="" /></div>}
  </section>;
}
