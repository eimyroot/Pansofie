import { requireUserContext } from "../../domain/user-context";
import ExperienceShell from "./ExperienceShell";
export default async function ExperienceLayout({ experience, children }) { const context = await requireUserContext(experience); return <ExperienceShell experience={experience} name={context.profile.display_name}>{children}</ExperienceShell>; }
