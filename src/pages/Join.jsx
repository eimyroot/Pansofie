import React from "react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import EntryJourney from "@/components/pansofie/EntryJourney";

export default function Join() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-24 sm:pt-28">
        <EntryJourney />
      </main>
      <PublicFooter />
    </div>
  );
}
