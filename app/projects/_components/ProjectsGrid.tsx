"use cache";

import { PROJECT_PRIORITY_ORDER, getProjects } from "@/lib/content/projects";

import SkillsAndCases from "./SkillsAndCases";

export default async function ProjectsGrid() {
  const projects = await getProjects();
  return <SkillsAndCases projects={projects} priorityOrder={PROJECT_PRIORITY_ORDER} />;
}
