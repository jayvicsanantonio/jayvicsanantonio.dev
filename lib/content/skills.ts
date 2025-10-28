import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";

import { SKILL_SECTIONS, SKILL_SECTIONS_DATA } from "./skills-data";
import type { SkillSection } from "./types";

export { SKILL_SECTIONS };

const loadSkillSections = cache(async (): Promise<readonly SkillSection[]> => {
  cacheTag("skills");
  cacheLife("days");
  return SKILL_SECTIONS_DATA;
});

export const getSkillSections = loadSkillSections;
