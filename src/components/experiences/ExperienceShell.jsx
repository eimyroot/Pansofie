export default function ExperienceShell({ experience, name, children }) {
  return <div className="experience-shell" data-experience={experience} data-user={name || "Můj prostor"}>{children}</div>;
}
