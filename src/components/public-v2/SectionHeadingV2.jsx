export function SectionHeadingV2({ eyebrow, title, body, id }) {
  return <div className="ps2-section-heading">
    <div>
      {eyebrow && <p className="ps2-eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
    </div>
    {body && <p>{body}</p>}
  </div>;
}
