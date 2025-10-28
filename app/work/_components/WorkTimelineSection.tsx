"use cache";

import { getExperiences } from "@/lib/content/experiences";

import WorkTimeline from "./WorkTimeline.client";

export default async function WorkTimelineSection() {
  const experiences = await getExperiences();
  return <WorkTimeline experiences={experiences} />;
}
