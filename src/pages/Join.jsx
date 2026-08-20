import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import EntryJourney from "@/components/pansofie/EntryJourney";
import JoinNetwork from "@/components/pansofie/JoinNetwork";

export default function Join() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const showJourney = searchParams.get("mode") === "simulator"
    || Boolean(searchParams.get("role"))
    || location.state?.entryMode === "simulator";

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-24 sm:pt-28">
        {showJourney ? <EntryJourney /> : <JoinNetwork />}
      </main>
      <PublicFooter />
    </div>
  );
}
