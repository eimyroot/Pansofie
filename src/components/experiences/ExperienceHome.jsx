export default function ExperienceHome({ role }) {
  return <section className="experience-grid" aria-label="Společné funkce Pansofie"><article><h2>Objevujte</h2><p>Knihovna poznání a inspirace zůstává společná pro všechny světy.</p></article><article><h2>Zapojte se</h2><p>Mise a příležitosti se přizpůsobují vašemu kontextu.</p></article><article><h2>Váš prostor</h2><p>Oprávnění: {role || "osobní účet"}. Vzhled toto oprávnění nemění.</p></article></section>;
}
