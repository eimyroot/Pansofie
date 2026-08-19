import React from "react";
import PartnerHub from "@/pages/PartnerHub";
import PartnerReviewPanel from "@/components/pansofie/PartnerReviewPanel";

export default function PartnerWorkspace() {
  return (
    <>
      <PartnerHub />
      <div className="product-shell pt-0">
        <PartnerReviewPanel />
      </div>
    </>
  );
}
