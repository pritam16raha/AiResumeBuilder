// src/db/schema/index.ts
import { resumes, resumeRelations } from "./resumes";
import { users } from "./users";
import { projects, projectRelations } from "./projects";
import {
  projectDescriptionRelations,
  projectDescriptions,
} from "./projectDescriptions";
import { experiences, experienceRelations } from "./experiences";
import {
  experienceDescriptions,
  experienceDescriptionsRelations,
} from "./experienceDescriptions";
import { coverLetters } from "./coverLetters";


export const schema = {
  users,
  resumes,
  resumeRelations,
  projects,
  projectRelations,
  projectDescriptions,
  experiences,
  experienceRelations,
  experienceDescriptions,
  projectDescriptionRelations,
  experienceDescriptionsRelations,
  coverLetters
};

// ✅ Re-export everything for global usage
export * from "./coverLetters";
export * from "./resumes";
export * from "./projects";
export * from "./experiences";
export * from "./projectDescriptions";
export * from "./experienceDescriptions";
