import { redirect } from "next/navigation";
import { requireUserContext } from "../../domain/user-context";
import { routeForExperience } from "../../domain/experience";
export default async function AppEntryPage() { const context = await requireUserContext(); redirect(routeForExperience(context.experience)); }
