export function SourceBackedRelationV2({ sourceId, sourceType = "ZDROJOVÁ VAZBA", title, description, items = [] }) {
  return <article className="ps2-relation">
    <div className="ps2-relation__meta">
      <span>{sourceType}</span>
      <code>{sourceId}</code>
    </div>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {items.length > 0 && <dl>
      {items.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>}
  </article>;
}
