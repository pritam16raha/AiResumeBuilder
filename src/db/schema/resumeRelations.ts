// resumes.ts (add at bottom of same file or in relations file)
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { experiences } from "./experiences";
import { resumes } from "./resumes";

export const resumeRelations = relations(resumes, ({ many }) => ({
  projects: many(projects),
  experiences: many(experiences),
}));
