import { requireUserContext } from "../../../domain/user-context";
import TeensShell from "../../../components/experiences/TeensShell";

export default async function Layout({ children }) {
  const context = await requireUserContext("young_teens");
  return <TeensShell name={context.profile.display_name}>{children}</TeensShell>;
}
