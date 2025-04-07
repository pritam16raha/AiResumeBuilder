// src/db/schema/index.ts
import { resumes, resumeRelations } from "./resumes";
import { users } from "./users";
import { projects, projectRelations } from "./projects";

import { experiences, experienceRelations } from "./experiences";

import { coverLetters } from "./coverLetters";

export const schema = {
  users,
  resumes,
  resumeRelations,
  projects,
  projectRelations,
  experiences,
  experienceRelations,
  coverLetters,
};

// ✅ Re-export everything for global usage
export * from "./coverLetters";
export * from "./resumes";
export * from "./projects";
export * from "./experiences";
