export const EXPERIENCE_ROUTES = Object.freeze({
  adult_personal: "/app/personal", adult_family: "/app/family",
  adult_school: "/app/school", adult_company: "/app/company",
  young_kids: "/young/kids", young_teens: "/young/teens",
});

export function ageOn(dateOfBirth, today = new Date()) {
  if (!dateOfBirth) return null;
  const birth = new Date(`${dateOfBirth}T00:00:00Z`);
  if (Number.isNaN(birth.valueOf()) || birth > today) return null;
  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  if (today.getUTCMonth() < birth.getUTCMonth() || (today.getUTCMonth() === birth.getUTCMonth() && today.getUTCDate() < birth.getUTCDate())) age -= 1;
  return age;
}

export function resolveExperience({ dateOfBirth, accountContext, organizationType }, today = new Date()) {
  const age = ageOn(dateOfBirth, today);
  if (age !== null && age >= 6 && age <= 13) return "young_kids";
  if (age !== null && age >= 14 && age <= 20) return "young_teens";
  if (accountContext === "family") return "adult_family";
  if (accountContext === "school" || organizationType === "school") return "adult_school";
  if (accountContext === "company" || organizationType === "company") return "adult_company";
  return "adult_personal";
}

export function routeForExperience(experience) {
  return EXPERIENCE_ROUTES[experience] ?? EXPERIENCE_ROUTES.adult_personal;
}
