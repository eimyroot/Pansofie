import SchoolGoWorkspace from "../../../components/experiences/SchoolGoWorkspace";
import { loadSchoolGoSnapshot } from "../../../domain/school-go";
import { requireUserContext } from "../../../domain/user-context";

export default async function SchoolGoPage() {
  const context = await requireUserContext(undefined, { returnTo: "/go/school" });
  let snapshot;
  try {
    snapshot = await loadSchoolGoSnapshot(context);
  } catch {
    snapshot = {
      mode: "error",
      message: "Školní prostor se nepodařilo bezpečně načíst.",
      displayName: context.profile?.display_name || context.profile?.full_name || "Můj prostor",
      classes: [],
      missions: [],
    };
  }

  return <SchoolGoWorkspace snapshot={snapshot} />;
}
