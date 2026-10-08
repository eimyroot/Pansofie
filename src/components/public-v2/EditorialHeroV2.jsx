import Link from "next/link";

export function EditorialHeroV2({
  eyebrow,
  title,
  lead,
  primaryAction,
  secondaryAction,
  media,
  mediaPosition = "right",
  note,
  truthBadge,
}) {
  return <section className={"ps2-hero ps2-hero--media-" + mediaPosition}>
    <div className="ps2-hero__copy">
      {eyebrow && <p className="ps2-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      <p className="ps2-hero__lead">{lead}</p>
      {(primaryAction || secondaryAction) && <div className="ps2-hero__actions">
        {primaryAction && <Link className="ps2-button ps2-button--primary" href={primaryAction.href}>{primaryAction.label}</Link>}
        {secondaryAction && <Link className="ps2-button ps2-button--secondary" href={secondaryAction.href}>{secondaryAction.label}</Link>}
      </div>}
    </div>
    {media && <div className="ps2-hero__media">
      {media}
      {truthBadge && <span className="ps2-hero__truth">{truthBadge}</span>}
      {note && <p className="ps2-hero__note">{note}</p>}
    </div>}
  </section>;
}
