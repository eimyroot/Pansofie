import React from "react";
import { Link } from "react-router-dom";
import { ClassicHome } from "@/pages/ClassicPublicPage";
import ExperienceStory from "@/components/pansofie/ExperienceStory";
import RoleEntry from "@/components/pansofie/RoleEntry";
import PublicMaturity from "@/components/pansofie/PublicMaturity";

export default function Home() {
  return (
    <ClassicHome
      eyebrow="LEPŠÍ SOUVISLOSTI"
      primaryClassName="young-main-cta modern-primary"
      lead="Propojujeme lidi, znalosti a zdroje, aby se dobro, vědění i materiály mohly šířit, růst a znovu přinášet užitek. Pansofie propojuje učení se skutečnou zkušeností."
      safetyTitle="Dokončená aktivita ještě není důkaz skutečného dopadu."
      safetyBody="Pansofie nehodnotí hodnotu člověka. Rozlišuje mezi tím, co člověk udělal, co vzniklo a co se skutečně změnilo."
      simulatorSlot={
        <p className="young-simulator-note">
          <Link to="/zapojit-se?mode=simulator">Vyzkoušet Pansofii za 60 sekund</Link>
          <span>Interaktivní ukázka nic neodesílá ani neukládá na server.</span>
        </p>
      }
      safetySections={
        <div className="young-home-safety-sections">
          <ExperienceStory />
          <RoleEntry />
          <PublicMaturity />
        </div>
      }
    />
  );
}
