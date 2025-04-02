import { ExperienceFormItem, ExperienceItem } from "@/types/resume";

export default function transformToExperienceItem(
  exp: ExperienceFormItem
): ExperienceItem {
  return {
    company: exp.company,
    role: exp.role,
    year: exp.year,
    customPrompt: exp.customPrompt,
    descriptions: (exp.descriptions ?? []).map((desc, i) => ({
      id: desc.id ?? `${Date.now()}-${i}`,
      experienceId: "", // You can leave it blank; backend will fill it
      description: desc.description,
    })),
  };
}
