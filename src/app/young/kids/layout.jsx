import { requireUserContext } from "../../../domain/user-context";
import KidsShell from "../../../components/experiences/KidsShell";

export default async function Layout({ children }) {
  const context = await requireUserContext("young_kids");
  return <KidsShell name={context.profile.display_name}>{children}</KidsShell>;
}
