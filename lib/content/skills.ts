import { cacheLife } from "next/cache";

import { SKILL_SECTIONS, SKILL_SECTIONS_DATA } from "./skills-data";
import type { SkillSection } from "./types";

export { SKILL_SECTIONS };

export async function getSkillSections(): Promise<readonly SkillSection[]> {
  "use cache";
  cacheLife("days");
  return SKILL_SECTIONS_DATA;
}
