import GoWorkspace from "./GoWorkspace";
import { requireUserContext } from "../../domain/user-context";
import { loadGoAccountSnapshot } from "../../domain/go-account";

export default async function GoAuthenticatedPage({ view = "domov" }) {
  const returnTo = view === "domov" ? "/go" : `/go/${view}`;
  const context = await requireUserContext(undefined, { returnTo });
  const account = await loadGoAccountSnapshot(context);
  return (
    <GoWorkspace
      view={view}
      displayName={account.profile.displayName}
      account={account}
    />
  );
}
