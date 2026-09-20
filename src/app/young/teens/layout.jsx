import { requireUserContext } from "../../../domain/user-context";
import { resolveYoungPresentation } from "../../../domain/young-experience";
import TeensShell from "../../../components/experiences/TeensShell";

export const metadata = { title: "Young 14–20", robots: { index: false, follow: false } };

export default async function Layout({ children }) {
  const context = await requireUserContext("young_teens");
  const presentation = resolveYoungPresentation({ dateOfBirth: context.profile.date_of_birth });
  return <TeensShell name={context.profile.display_name} presentation={presentation}>{children}</TeensShell>;
}
