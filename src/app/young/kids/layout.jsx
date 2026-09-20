import { requireUserContext } from "../../../domain/user-context";
import { resolveYoungPresentation } from "../../../domain/young-experience";
import KidsShell from "../../../components/experiences/KidsShell";

export const metadata = { title: "Young 6–13", robots: { index: false, follow: false } };

export default async function Layout({ children }) {
  const context = await requireUserContext("young_kids");
  const presentation = resolveYoungPresentation({ dateOfBirth: context.profile.date_of_birth });
  return <KidsShell name={context.profile.display_name} presentation={presentation}>{children}</KidsShell>;
}
