import React from "react";
import PartnerAllianceDashboard from "@/components/pansofie/PartnerAllianceDashboard";
import PartnerHub from "@/pages/PartnerHub";
import PartnerReviewPanel from "@/components/pansofie/PartnerReviewPanel";

export default function PartnerWorkspace() {
  return (
    <>
      <PartnerAllianceDashboard />
      <div id="partner-challenge-workflow" className="scroll-mt-8"><PartnerHub /></div>
      <div id="partner-r5-review" className="product-shell pt-0 scroll-mt-8">
        <PartnerReviewPanel />
      </div>
    </>
  );
}
