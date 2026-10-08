export function ImpactDimensionsV2({ dimensions = [] }) {
  return <div className="ps2-impact-grid">
    {dimensions.map(({ id, label, body }) => <article key={id}>
      <span>{label}</span>
      {body && <p>{body}</p>}
    </article>)}
  </div>;
}
