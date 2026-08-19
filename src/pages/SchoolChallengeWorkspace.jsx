import React from "react";
import SchoolChallengeInbox from "@/pages/SchoolChallengeInbox";
import SchoolDeliverablePanel from "@/components/pansofie/SchoolDeliverablePanel";

export default function SchoolChallengeWorkspace() {
  return (
    <>
      <SchoolChallengeInbox />
      <div className="product-shell pt-0">
        <SchoolDeliverablePanel />
      </div>
    </>
  );
}
