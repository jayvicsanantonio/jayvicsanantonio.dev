"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProjects() {
  await revalidateTag("projects", "hours");
}

export async function revalidateExperiences() {
  await revalidateTag("experiences", "hours");
}

export async function revalidateSkills() {
  await revalidateTag("skills", "days");
}

export async function revalidateHeroConfig() {
  await revalidateTag("hero-config", "days");
}
