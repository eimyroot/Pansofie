import SchoolQuestExperience from "../../../../../components/experiences/SchoolQuestExperience";
import { loadSchoolQuestExperience } from "../../../../../domain/school-quest";
import { requireUserContext } from "../../../../../domain/user-context";

export const metadata = {
  title: "Školní mise · Pansofie GO",
  robots: { index: false, follow: false },
};

export default async function SchoolQuestPage({ params }) {
  const { assignmentId } = await params;
  const returnTo = `/go/school/quest/${encodeURIComponent(assignmentId || "")}`;
  const context = await requireUserContext(undefined, { returnTo });
  let quest;
  try {
    quest = await loadSchoolQuestExperience(context, assignmentId);
  } catch {
    quest = { mode: "error", reason: "load_failed" };
  }
  return <SchoolQuestExperience initialQuest={quest} />;
}
