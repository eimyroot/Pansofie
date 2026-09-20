import YoungWorkspace from "./YoungWorkspace";
import { requireUserContext } from "../../domain/user-context";
import { resolveYoungPresentation } from "../../domain/young-experience";
import { loadYoungAccountSnapshot } from "../../domain/young-account";

export default async function YoungAuthenticatedPage({ expectedExperience }) {
  const context = await requireUserContext(expectedExperience);
  const presentation = resolveYoungPresentation({ dateOfBirth: context.profile.date_of_birth });
  const account = await loadYoungAccountSnapshot(context);

  return (
    <YoungWorkspace
      variant={expectedExperience === "young_teens" ? "teens" : "kids"}
      presentation={presentation}
      displayName={context.profile.display_name || context.profile.full_name || "Můj svět"}
      account={account}
    />
  );
}
